import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../models/AuthResponseData.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { autoLogout } from '../auth/state/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';

@Injectable({
    providedIn: 'root',
  })


  export class AuthService {
  timeoutInterval: any;
    constructor(private http: HttpClient,private store: Store<AppState>){}

    login(email:string,password:string): Observable<AuthResponseData> {
      console.log("Hello i am in login service");
      return this.http.post<AuthResponseData>('http://localhost:3000/user',
      { email, password, returnSecureToken: true }
     );
    }

    signUp(email: string,password: string): Observable<AuthResponseData> {
      return this.http.post<AuthResponseData>(`http://localhost:3000/posts`,
        { email, password, returnSecureToken: true }
       );
    }

      formatUser(data: AuthResponseData){  //Response Payload 
        const expirationDate = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        const user = new User(
          data.email,
          data.idToken,
          data.localId,
          expirationDate
        );
        return user;
      }

      getErrorMessage(message: string) {
        switch (message) {
          case 'EMAIL_NOT_FOUND':
            return 'Email Not Found';
          case 'INVALID_PASSWORD':
            return 'Invalid Password';
          case 'EMAIL_EXISTS':
            return 'Email already exists';
          default:
            return 'Unknown error occurred. Please try again';
        }
      }

      setUserInLocalStorage(user:User){
        localStorage.setItem('UserData',JSON.stringify(user));
        this.runTimeoutInterval(user);        
      }

      runTimeoutInterval(user: User) {
        const todaysDate = new Date().getTime();
        const expirationDate = user.expireDate.getTime();
        const timeInterval = expirationDate - todaysDate;
    
        this.timeoutInterval = setTimeout(() => {
          this.store.dispatch(autoLogout());
          //logout functionality or get the refresh token
        }, timeInterval);
      }

      getUserFromLocalStorage() {
        const userDataString = localStorage.getItem('UserData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          const expirationDate = new Date(userData.expirationDate);
          const user = new User(
            userData.email,
            userData.token,
            userData.localId,
            expirationDate
          );
          this.runTimeoutInterval(user);
          return user;
        }
        return null;
      }
      logout(){
        // localStorage.removeItem('UserData');
        // if(this.timeoutInterval){
        //   clearTimeout(this.timeoutInterval);
        //   this.timeoutInterval = null;
        // }
      }
  }