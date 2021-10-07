import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Pizza } from './reducer';
import { selectAllPizza } from './selectors';
import { State } from '../index';
import * as fromPizzaActions from './actions';

export const LOCAL_STORAGE_KEY = 'ngrx-pizzas';

@Injectable()
export class PizzaEffectService {
  read$ = createEffect(() => this.action$.pipe(
    ofType(fromPizzaActions.PizzaAction.READ),
    switchMap(() => from(this.readPizzas())),
    map(list => fromPizzaActions.readSuccess({
      list,
    }))
  ));

  changes$ = createEffect(() => this.action$.pipe(
    ofType(fromPizzaActions.PizzaAction.CREATE, fromPizzaActions.PizzaAction.UPDATE, fromPizzaActions.PizzaAction.DELETE),
    mergeMap(() => this.store.select(selectAllPizza)),
    mergeMap((list) => from(this.savePizzas(list)))
  ), { dispatch: false });

  constructor(private readonly action$: Actions, private readonly store: Store<State>) {}

  async readPizzas(): Promise<Pizza[]> {
    console.log('Read Pizzas from Storage');

    const rawList = localStorage.getItem(LOCAL_STORAGE_KEY);
    let pizzaList = [] as Pizza[];
    if (rawList) {
      try {
        pizzaList = JSON.parse(rawList);
      } catch(e) {
        console.warn('Could not read pizza list. Clean it up to avoid further errors!');
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
    return pizzaList;
  }

  async savePizzas(list: Pizza[]): Promise<void> {
    if (list) {
      console.log('Save Pizzas to Storage');
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    }
  }
}

