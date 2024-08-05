import { createReducer, on ,Action} from "@ngrx/store";
import { increase, decrease, reset } from "./mycounter.action";
import { initialState } from './mycounter.state';

const myreduces = createReducer(
    initialState,
    on(increase,(state)=>{
            return{
                ...state,
                counter: state.counter +1,
            };
    }),
    on(decrease,(state)=>{
        return{
            ...state,
            counter: state.counter - 1,
        }
    }),
    on(reset,(state)=>{
        return{
            ...state,
            counter: state.counter =0,
        }
    })
);

export function counterReducer(state:{ counter:number } | undefined ,action:Action){
    return myreduces(state,action);
}