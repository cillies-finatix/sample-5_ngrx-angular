import { Action, createAction, props } from "@ngrx/store";
import { Pizza } from "./reducer";

export interface PizzaActionPayload {
    id?: number;
    name?: string;
    price?: number;
    ingridients?: string[];
}

export enum PizzaAction {
    CREATE = '[Pizza] CREATE',
    READ = '[Pizza] READ',
    READ_SUCCESS = '[Pizza] READ_SUCCESS',
    UPDATE = '[Pizza] UPDATE',
    DELETE = '[Pizza] DELETE',
}

export const create = createAction(PizzaAction.CREATE, props<PizzaActionPayload>());
export const read = createAction(PizzaAction.READ);
export const readSuccess = createAction(PizzaAction.READ_SUCCESS, props<{ list: Pizza[] }>());
export const update = createAction(PizzaAction.UPDATE, props<PizzaActionPayload>());
export const remove = createAction(PizzaAction.DELETE, props<PizzaActionPayload>());