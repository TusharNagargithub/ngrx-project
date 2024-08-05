import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { createEffect, ofType,Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, EMPTY, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { autoLogin, autoLogout, loginStart, loginSuccess, signupStart ,signupSuccess } from "src/app/auth/state/auth.actions";
import { AuthService } from "src/app/services/auth.service";
import { AppState } from "src/app/store/app.state";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/Shared/shared.actions";

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private store:Store<AppState>,
        private router: Router    
    ){}
    
    login$ = createEffect(() => {
        return this.actions$.pipe( //action$ try to return some observable
            ofType(loginStart),  // filtering the action
            exhaustMap((action) => {  // 
                return this.authService.login(action.email, action.password)  // call the service
                .pipe(map((data) => {
                    console.log("I am login success");
                    this.store.dispatch(setLoadingSpinner({status:false}));
                    this.store.dispatch(setErrorMessage({message: ''}));
                    const user = this.authService.formatUser(data);
                    this.authService.setUserInLocalStorage(user);
                    return loginSuccess({user, redirect: true});   // action
                }),
                catchError((errRes) => {
                    console.log("I am not login success");
                    this.store.dispatch(setLoadingSpinner({status:false}));
                    console.log(errRes.error.error.message);
                    const errorMessage = this.authService.getErrorMessage(
                        errRes?.error?.error?.message  
                    );
                    return of(setErrorMessage({message: errorMessage}));
                })
            );
            })
        );
    });
    loginRedirect$ =createEffect(() => {
        return this.actions$.pipe(
            ofType(...[loginSuccess,signupSuccess]),
            tap((action) => { // tap means no observable return
                this.store.dispatch(setErrorMessage({message: ''}));
                console.log(action.redirect,"I am tushar check redirect");
                if(action.redirect){
                    console.log("I am in action.redirect true");
                    this.router.navigate(['/signup']);                   
                }
                else{
                    console.log("I am in not action.redirect i.e. false");
                }
            })
        )
    },{dispatch:false})//dispatch false means can not be return any observable
    //Here dispatch:false is not return it will try to return something 


    /////
    signUp$ = createEffect(() => {
        return this.actions$.pipe( //action$ try to return some observable
            ofType(signupStart),  // filtering the action
            exhaustMap((action) => {  // 
                return this.authService.signUp(action.email, action.password)  // call the service
                .pipe(map((data) => {
                    console.log("SignUp Success");
                    this.store.dispatch(setLoadingSpinner({status:false}));
                    this.store.dispatch(setErrorMessage({message: ''}));
                    const user = this.authService.formatUser(data);
                    this.authService.setUserInLocalStorage(user);
                    return signupSuccess({user,redirect: true}); // action
                }),
                catchError((errRes) => {
                    console.log("SignUp fail");
                    this.store.dispatch(setLoadingSpinner({status:false}));
                    console.log(errRes.error.error.message);
                    const errorMessage = this.authService.getErrorMessage(
                        errRes.error.error.message
                    );
                    return of(setErrorMessage({message: errorMessage}));
                })
            );
            })
        );
    });

    // signUpRedirect$ =createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(signupSuccess),
    //         tap((action) => { // tap means no observable return
    //             this.store.dispatch(setErrorMessage({message: ''}));
    //             this.router.navigate(['/']);
    //         })
    //     )
    // },{dispatch:false})//dispatch false means can not be return any observable
    //Here dispatch:false is not return it will try to return something 

    ////


    // signUp$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(signupStart),
    //         exhaustMap((action) => {
    //             return this.authService
    //             .signUp(action.email,action.password)
    //             .pipe(map(data) => {
    //                 this.store.dispatch()
    //                 const user = this.authService.formatUser(data);
    //                 return signupSuccess({user});
    //             }); //data is getting auth Response data
    //         })
    //     );
    // })

    autoLogin$ = createEffect(() => {
        return this.actions$.pipe(
          ofType(autoLogin),
          mergeMap((action) => {
            const user = this.authService.getUserFromLocalStorage();
            if(user){
                console.log("sucess");
                return of(loginSuccess({ user, redirect:false }));
            }else{

                console.log(user,"Unsucess");
                return EMPTY; // return an empty observable if no user is found
            }
          })
        );
      });
      logout$ = createEffect(()=>{
        return this.actions$.pipe(ofType(autoLogout),map((action)=>{
            this.authService.logout();
            this.router.navigate(['auth']);
        }))
      },{dispatch:false})
}


