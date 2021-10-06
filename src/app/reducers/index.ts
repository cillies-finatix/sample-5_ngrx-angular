import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

// global App State
export interface State {
  pizza: PizzaState;
}

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

export interface PizzaAction extends Action {
  id?: number;
  name?: string;
  price?: number;
  ingridients?: string[];
}

// single reducer that catched multiple actions at once
const pizzaReducer: ActionReducer<PizzaState, PizzaAction> = (featureState, action) => {
  const type = action.type;
  let list = featureState?.list ?? [];
  console.log('ACTION:', action)
  switch(type) {
    case 'CREATE': 
      list = [...list, {
        id: generateId(),
        name: action.name ?? 'Unbekannt',
        price: action.price ?? Infinity,
        ingridients: action.ingridients ?? [],
      }]; 
      break;
    case 'READ_SUCCESS': list = [...(action as any).list]; break;
    // case 'READ': break;
    case 'UPDATE':
      const pizzaIndex = list.findIndex(p => p.id === action.id);
      if (pizzaIndex > -1) {
        const pizza = list[pizzaIndex];
        list = [
          ...list.slice(0, pizzaIndex),
          {
            ...pizza,
            ...action
          },
          ...list.slice(pizzaIndex + 1),
        ]
      } 
      break;
    case 'DELETE':
      list = list.filter(p => p.id !== action.id); 
      break;
  }
  return { ...featureState, list };
};

// all global REDUCER
export const reducers: ActionReducerMap<State> = {
  pizza: pizzaReducer
};

// Selectors -> first select feature, then state properties

export const selectPizza = createFeatureSelector<PizzaState>('pizza');
export const selectAllPizza = createSelector(selectPizza, state => state.list);

function generateId(): number {
  return Math.ceil(Math.random() * 10000);
}
