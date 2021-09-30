import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

// global App State
export interface State {
  countState: CountState;
}

// Feature states
export interface CountState {
  current: number;
}

// single reducer that catched multiple actions at once
const countReducer: ActionReducer<CountState, Action> = (featureState, action) => {
  const type = action.type;
  let current = featureState?.current ?? 0;
  switch(type) {
    case '+': current += 1; break;
    case '-': current -= 1; break;
  }
  return { ...featureState, current };
};

export const reducers: ActionReducerMap<State> = {
  countState: countReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
