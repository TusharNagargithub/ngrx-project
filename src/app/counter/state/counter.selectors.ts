import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterState } from "./counter.state";

export const COUNTER_STATE_NAME = 'counter';

const getCounterState = createFeatureSelector<CounterState>(COUNTER_STATE_NAME);// counter this counter represent the name like this represent in app.module.ts+


// CounterState -> they represent the type of Data
export const getCounter = createSelector(getCounterState,(state) => {
    return state.counter;
});

// getCounter get only counter value

export const getChangeNAme = createSelector(getCounterState,(state) => {
    return state.channelName;
});