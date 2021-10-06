import { ChangeDetectionStrategy, Component, OnInit, TrackByFunction } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { Pizza } from 'src/app/reducers/pizza/reducer';
import { selectCurrentPizza } from 'src/app/reducers/pizza/selectors';
import * as fromPizzaActions from '../../../reducers/pizza/actions';

@Component({
  selector: 'fin-details',
  template: `
    <h2>Pizza Detail Ansicht:</h2>
    <section class="pizza-details grid-y">
      <ng-container *ngIf="pizza$|async as pizza">
        <h3>{{pizza.name}}</h3>
        <img class="thumbnail" src="https://img.pizza/600/256" alt="Pizza Pizza Pizza nomnomnom"> 
        <div class="ingridients">
          <ng-container *ngFor="let ingridient of pizza.ingridients">
            <span class="label">{{ingridient}}</span>&nbsp;
          </ng-container>
        </div>
        <strong>{{pizza.price | currency  }}</strong>
        <div class="grid-x grid-margin-x">
          <a role="button" class="cell medium-6 button warning" (click)="removePizza(pizza)">Pizza entfernen</a>
          <a role="button" class="cell medium-6 button" routerLink="../../overview">Zurück zur Übersicht</a>
        </div>
      </ng-container>
    </section>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent {
  pizza$ = this.store.select(selectCurrentPizza);
  trackByName: TrackByFunction<Pizza> = (idx, item) => item.name;
  constructor(private readonly store: Store<State>, private readonly router: Router) {}
  removePizza(pizza:Pizza): void {
    this.store.dispatch(fromPizzaActions.remove(pizza));
    this.router.navigate(['pizza','overview']);
  }
}
