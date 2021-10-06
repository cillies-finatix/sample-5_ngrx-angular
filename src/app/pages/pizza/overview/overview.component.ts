import { ChangeDetectionStrategy, Component, OnInit, TrackByFunction } from '@angular/core';
import { PizzenService } from 'src/app/reducers/pizza-entity.service';
import { Pizza } from 'src/app/reducers/pizza/reducer';

@Component({
  selector: 'fin-overview',
  template: `
    <h2>Pizza-Sortiment:</h2>
    <p *ngIf="isLoadingPizzen$|async">Lade tolle Pizzen ...</p>
    <ul>
      <ng-container *ngIf="pizza$|async as pizzen">
        <li *ngIf="pizzen.length === 0">Keine Pizzen :(</li>
        <li [routerLink]="['..', 'details', pizza.id]" role="button" *ngFor="let pizza of pizzen; trackBy: trackByName">
          <img class="thumbnail" [src]="'https://img.pizza/150/64#'+randomStr()" alt="Pizza Pizza Pizza nomnomnom"> 
          <strong>{{ pizza.name }}</strong>
          - 
          <em>{{ pizza.price | currency }}</em>
          -
          <span>
          mit {{pizza.ingridients.length}} Zutaten
          </span>
        </li>
      </ng-container>
    </ul>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  pizza$ = this.pizzenService.entities$;
  isLoadingPizzen$ = this.pizzenService.loading$;
  trackByName: TrackByFunction<Pizza> = (idx, item) => item.name;
  constructor(private readonly pizzenService: PizzenService) { }
  randomStr(): string { return Math.random().toString(32).substr(2); }
}
