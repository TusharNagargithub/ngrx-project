import { createAction } from "@ngrx/store";

export const increase = createAction("increase");
export const decrease = createAction("decrease");
export const reset = createAction("reset");