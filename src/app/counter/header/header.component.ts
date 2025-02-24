import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { isAuthenticated } from 'src/app/auth/state/auth.selector';
import { autoLogout } from 'src/app/auth/state/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  isAuthenticated?: Observable<boolean>;
  constructor(private store: Store<AppState>){}

  ngOnInit(): void{
    this.isAuthenticated = this.store.select(isAuthenticated);
    console.log(this.isAuthenticated," Here we check isAuthenticated");
  }

  OnLogout(event: Event){
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }

}