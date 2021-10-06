import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { PizzaStoreModule } from "./pizza/pizza-store.module";
import { routerReducer, StoreRouterConnectingModule } from "@ngrx/router-store";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({
        router: routerReducer,
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    PizzaStoreModule,
  ],
})
export class RootStoreModule {}
