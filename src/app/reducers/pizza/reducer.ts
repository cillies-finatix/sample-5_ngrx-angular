import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import {
  Action,
  createReducer,
  on,
} from "@ngrx/store";
import * as fromPizzaActions from "./actions";

export interface PizzaState extends EntityState<Pizza> {}

export interface Pizza {
  id: number;
  name: string;
  price: number;
  ingridients: string[];
}

export function pizzaSorter(a: Pizza, b: Pizza): number {
  return a.name.localeCompare(b.name);
}

export const adapter: EntityAdapter<Pizza> = createEntityAdapter<Pizza>({
  selectId: pizza => pizza.id,
  sortComparer: pizzaSorter
});

const pizzaReducer = createReducer<PizzaState>(
  adapter.getInitialState(),
  on(fromPizzaActions.create, (state, action) => adapter.addOne({...action, id: generateId() }, state)),
  on(fromPizzaActions.readSuccess, (state, action) => adapter.setAll(action.list, state)),
  on(fromPizzaActions.update, (state, action) => adapter.updateOne(action, state)),
  on(fromPizzaActions.remove, (state, { id }) => adapter.removeOne(id, state))
);

export function reducer(state: PizzaState | undefined, action: Action) {
  return pizzaReducer(state, action);
}

function generateId(): number {
  return Math.ceil(Math.random() * 10000);
}