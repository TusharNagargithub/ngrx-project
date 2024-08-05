import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { Observable, Subscription } from 'rxjs';
import { getCounter } from '../state/counter.selectors';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent {
  //  @Input() counter : number | undefined;
  counter: number| undefined;
  // counter$: Observable<{ counter: number; }> | undefined ;
 // counterSubscription: Subscription | undefined;

 // counter$: Observable<number>;

  // constructor(private store: Store<{counter: CounterState}>){}
  constructor(private store: Store<AppState>){}
  ngOnInit(): void{
    // this.store.select('counter').subscribe(data => {
    //   this.counter = data.counter;
    // });
    this.store.select(getCounter).subscribe((counter) => {
      this.counter = counter;
    } )

    // this.counter$ = this.store.select('counter');

    //this.counter$ = this.store.select(getCounter);
  }

  //ngOnDestroy(){
    // if(this.counterSubscription){
    //   this.counterSubscription.unsubscribe();
    // }
  //}
}
