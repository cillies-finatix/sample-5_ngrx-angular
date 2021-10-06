import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { routerReducer, StoreRouterConnectingModule } from "@ngrx/router-store";
import { EntityDataModule } from "@ngrx/data";
import { entityMetadata, pluralNames } from "./metadata";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({
        router: routerReducer,
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    EntityDataModule.forRoot({
        pluralNames,
        entityMetadata,
    }),
  ],
})
export class RootStoreModule {}
