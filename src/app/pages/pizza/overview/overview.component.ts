import { ChangeDetectionStrategy, Component, OnInit, TrackByFunction } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { Pizza } from 'src/app/reducers/pizza/reducer';
import { selectAllPizza } from 'src/app/reducers/pizza/selectors';

@Component({
  selector: 'fin-overview',
  template: `
    <h2>Pizza-Sortiment:</h2>
    <ul>
      <li [routerLink]="['..', 'details', pizza.id]" role="button" *ngFor="let pizza of pizza$|async; trackBy: trackByName">
        <img class="thumbnail" [src]="'https://img.pizza/150/64#'+randomStr()" alt="Pizza Pizza Pizza nomnomnom"> 
        <strong>{{ pizza.name }}</strong>
        - 
        <em>{{ pizza.price | currency }}</em>
        -
        <span>
        mit {{pizza.ingridients.length}} Zutaten
        </span>
      </li>
    </ul>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {

  pizza$ = this.store.select(selectAllPizza);
  trackByName: TrackByFunction<Pizza> = (idx, item) => item.name;
  constructor(private readonly store: Store<State>) {}

  randomStr(): string { return Math.random().toString(32).substr(2); }
}
