import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Pizza } from "./pizza/reducer";

@Injectable({
    providedIn: 'root'
})
export class PizzenService extends EntityCollectionServiceBase<Pizza> {
  constructor(elementsFactory: EntityCollectionServiceElementsFactory) {
    super('Pizza', elementsFactory);
  }
 
  // ... your special sauce here
}