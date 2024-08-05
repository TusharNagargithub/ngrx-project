import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loginStart } from '../state/auth.actions';
import { setLoadingSpinner } from 'src/app/store/Shared/shared.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup ;

  constructor(private store: Store<AppState>) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    
  }
  onLoginSubmit(){
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.store.dispatch(setLoadingSpinner({status:true}));
    this.store.dispatch(loginStart({email,password}));
  }
}