import { PizzaState } from './reducer';
// Selectors -> first select feature, then state properties

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectRouteParam } from "../router";
import { adapter } from "./reducer";

// get the selectors
const { selectAll } = adapter.getSelectors();

export const selectPizzaFeature = createFeatureSelector<PizzaState>('pizza');
export const selectAllPizza = createSelector(selectPizzaFeature, selectAll);
export const selectCurrentPizza = createSelector(
  selectAllPizza,
  selectRouteParam("pizzaId"),
  (list, pizzaId) => list.find((p) => p.id === Number(pizzaId))
);
