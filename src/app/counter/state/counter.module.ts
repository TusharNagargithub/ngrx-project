import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CounterComponent } from '../counter/counter.component';
import { CounterOutputComponent } from '../counter-output/counter-output.component';
import { ButtonsComponent } from '../buttons/buttons.component';
import { CommonModule } from '@angular/common';
import { CustomCounterInputComponent } from '../custom-counter-input/custom-counter-input.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter.reducer';
import { COUNTER_STATE_NAME } from './counter.selectors';

const routes: Routes = [{
    path: '',
    component: CounterComponent,
},
];

@NgModule({
    declarations: [
        CounterComponent,
        CounterOutputComponent,
        ButtonsComponent,
        CustomCounterInputComponent
    ],
    imports: [CommonModule,FormsModule, RouterModule.forChild(routes), StoreModule.forFeature(COUNTER_STATE_NAME,counterReducer)],
})

export class CounterModule {}