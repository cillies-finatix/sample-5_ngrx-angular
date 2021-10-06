import {
  Action,
  createReducer,
  on,
} from "@ngrx/store";
import * as fromPizzaActions from "./actions";

// Feature states
export interface PizzaState {
  list: Pizza[];
}

export interface Pizza {
  id: number;
  name: string;
  price: number;
  ingridients: string[];
}

const pizzaReducer = createReducer<PizzaState>(
  { list: [] },
  on(fromPizzaActions.create, (state, action) => ({
    ...state,
    list: [
      ...state.list,
      {
        id: generateId(),
        name: action.name ?? "Unbekannt",
        price: action.price ?? Infinity,
        ingridients: action.ingridients ?? [],
      },
    ],
  })),
  on(fromPizzaActions.readSuccess, (state, action) => ({
    ...state,
    list: [...action.list],
  })),
  on(fromPizzaActions.update, (state, action) => {
    const pizzaIndex = state.list.findIndex((p) => p.id === action.id);
    if (pizzaIndex > -1) {
      const pizza = state.list[pizzaIndex];
      return {
        ...state,
        list: [
          ...state.list.slice(0, pizzaIndex),
          {
            ...pizza,
            ...action,
          },
          ...state.list.slice(pizzaIndex + 1),
        ],
      };
    }
    return state;
  }),
  on(fromPizzaActions.remove, (state, { id }) => ({
    ...state,
    list: state.list.filter((p: Pizza) => p.id !== id),
  }))
);

export function reducer(state: PizzaState | undefined, action: Action) {
  return pizzaReducer(state, action);
}

function generateId(): number {
  return Math.ceil(Math.random() * 10000);
}
