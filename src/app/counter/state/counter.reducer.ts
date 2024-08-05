import { Action, createReducer, on } from "@ngrx/store";
import { CounterState, initialState } from "./counter.state";
import { changeName, customIncrement, decrement, increment, reset } from "./counter.actions";

const _counterReducer = createReducer(
    initialState,
    on(increment, (state) => {
        return {
            ...state,
            counter: state.counter + 1,
        };
    }),
    on(decrement, (state) => {
        return {
            ...state,
            counter: state.counter - 1,
        };
    }),
    on(reset, (state) => {
        return {
            ...state,
            counter: 0,
        }
    }),
    on(customIncrement,(state, action) => {
        console.log(action);
        console.log(state,"I am in counter reducer.ts");
        
        return {
            ...state,
            counter:state.counter + action.count,
        }
    }),
    on(changeName,(state,action) => {
        return {
            ...state,
            channelName: "Modified name",
        }
    })
    
);

export function counterReducer(state: CounterState | undefined,action: Action){
    return _counterReducer(state,action);
}
