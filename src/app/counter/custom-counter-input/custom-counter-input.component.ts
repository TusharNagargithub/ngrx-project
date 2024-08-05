import { Component} from '@angular/core';
import { CounterState } from '../state/counter.state';
import { Store } from '@ngrx/store';
import { changeName, customIncrement } from '../state/counter.actions';
import { getChangeNAme } from '../state/counter.selectors';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css']
})
export class CustomCounterInputComponent {
  value:number|undefined;
  channelName: string|undefined;
  constructor(private store: Store<{counter: CounterState}>){
    console.log("Tushar");

  }
  ngOnInit(): void{
    console.log("Hello");
    // this.store.select('counter').subscribe(data => {
    //   this.channelName = data.channelName;
    //   console.log("Tushar");
    //   console.log(this.channelName);
    // })
    this.store.select(getChangeNAme).subscribe((changeName) => {
      this.channelName = changeName;
      console.log("Tushar");
      console.log(this.channelName);
    })
  }
  onAdd(){
    if(this.value!==undefined){
      this.store.dispatch(customIncrement({count: +this.value})); //Here + converted into number 
    }
  }
  onChangeText(){
    this.store.dispatch(changeName());
  }
}