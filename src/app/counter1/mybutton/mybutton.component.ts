import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrease, increase, reset } from '../state/mycounter.action';

@Component({
  selector: 'app-mybutton',
  templateUrl: './mybutton.component.html',
  styleUrls: ['./mybutton.component.css']
})
export class MybuttonComponent {
  Store: any;
  constructor(private store: Store<{counter:{counter:number}}>){}
  OnIncrement(){
    this.Store.dispatch(increase());
  }
  OnDecrement(){
    this.Store.dispatch(decrease());
  }
  OnReset(){
    this.Store.dispatch(reset());
  }
}
