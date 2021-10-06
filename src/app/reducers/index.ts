import { RouterReducerState } from '@ngrx/router-store';
import { PizzaState } from './pizza/reducer';
// global App State
export interface State {
  pizza: PizzaState;
  router: RouterReducerState;
}
