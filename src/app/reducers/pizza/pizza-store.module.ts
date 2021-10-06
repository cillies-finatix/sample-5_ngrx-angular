import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { PizzaEffectService } from "./effect.service";
import { reducer } from "./reducer";

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('pizza', reducer), EffectsModule.forFeature([PizzaEffectService])],
})
export class PizzaStoreModule {}
