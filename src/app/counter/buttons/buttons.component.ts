import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../state/counter.actions';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent {

  // @Output() increment = new EventEmitter<void>();
  // @Output() decrement = new EventEmitter<void>();
  // @Output() reset = new EventEmitter<void>();
  constructor(private store: Store<{counter:{counter:number}}>){}
  // counter:number|undefined;
  OnIncrement(){
    // this.increment.emit();
    // Dispatch
    this.store.dispatch(increment());  //this.store refers to the instance of the NgRx store 
  }
  OnDecrement(){
    // this.decrement.emit();
    // Dispatch
    this.store.dispatch(decrement());
  }
  OnReset(){
    // this.reset.emit();
    //Dispatch
    this.store.dispatch(reset());
  }
  onChange(){
    
  }
}
