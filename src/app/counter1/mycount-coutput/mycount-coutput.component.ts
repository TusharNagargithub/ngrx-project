import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-mycount-coutput',
  templateUrl: './mycount-coutput.component.html',
  styleUrls: ['./mycount-coutput.component.css']
})
export class MycountCoutputComponent {
  
  counter: number| undefined;
  constructor(private store: Store<{counter: { counter: number }}>){}
  ngOnInit(): void{
    this.store.select('counter').subscribe(data => {
      this.counter = data.counter;
    })
  }
}
