import { EntityState } from "@ngrx/entity";

export interface PizzaState extends EntityState<Pizza> {}

export interface Pizza {
  id: number;
  name: string;
  price: number;
  ingridients: string[];
}
