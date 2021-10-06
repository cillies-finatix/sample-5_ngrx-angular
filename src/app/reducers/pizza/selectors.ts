
// Selectors -> first select feature, then state properties

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { selectRouteParam } from "../router";
import { PizzaState } from "./reducer";

export const selectPizza = createFeatureSelector<PizzaState>('pizza');
export const selectAllPizza = createSelector(selectPizza, state => state.list);
export const selectCurrentPizza = createSelector(
    selectAllPizza, 
    selectRouteParam('pizzaId'), 
    (list, pizzaId) => list.find(p => p.id === Number(pizzaId)));
