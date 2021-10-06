import { ChangeDetectionStrategy, Component, TrackByFunction } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Pizza, State } from './reducers';
import { selectAllPizza } from './reducers/index';

@Component({
  selector: 'fin-root',
  template: `
    <div class="grid-container">
      <h1>
        Hallo Pizza Meister!
      </h1>

      <h2>Erstell' 'ne neue Pizza</h2>
      <section class="grid-container">
        <form class="grid-x grid-padding-x" [formGroup]="createPizzaForm" (ngSubmit)="createPizza()">
          <div class="medium-6 cell"><label>Name der Pizza<input type="text" formControlName="name" /></label></div>
          <div class="medium-6 cell"><label>Preis der Pizza<input type="number" formControlName="price"/></label></div>
          <div class="medium-6 cell">
            <label>Zutaten der Pizza:
              <select multiple formControlName="ingridients">
                <option *ngFor="let option of ingridientOptions" [value]="option">{{option}}</option>
              </select>
            </label>
          </div>
          <div class="medium-6 cell">
            <button class="button success" type="submit">Pizza erstellen</button>
          </div>
        </form>
      </section>
      
      <h2>Pizza-Sortiment:</h2>
      <ul>
        <li *ngFor="let pizza of pizza$|async; trackBy: trackByName">
          <img class="thumbnail" [src]="'https://img.pizza/150/64#'+randomStr()" alt="Pizza Pizza Pizza nomnomnom"> 

          <a (click)="updatePizza(pizza)">
            <strong>{{ pizza.name }}</strong>
          </a>
          - 
          <em>{{ pizza.price | currency }}</em>
          
          -
          <a (click)="showIngridients(pizza)">
          mit {{pizza.ingridients.length}} Zutaten
          </a>
          -
          <a role="button" (click)="removePizza(pizza)">Entferne Pizza aus Sortiment</a>
        </li>
      </ul>
      
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  pizza$ = this.store.select(selectAllPizza);
  createPizzaForm = this.fb.group({
    name: this.fb.control(''),
    price: this.fb.control(''),
    ingridients: this.fb.control([]),
  });

  ingridientOptions = [
    "Käse",
    "Salami",
    "Schinken",
    "Ananas",
    "Tomatensoße",
  ];
  
  trackByName: TrackByFunction<Pizza> = (idx, item) => item.name;
  constructor(private readonly store: Store<State>, private readonly fb: FormBuilder) {}

  createPizza(): void {
    this.store.dispatch({ type: 'CREATE', ...this.createPizzaForm.value });
    this.createPizzaForm.reset();
  }

  removePizza(pizza: Pizza): void {
    this.store.dispatch({
      type: 'DELETE', 
      ...pizza,
    });
  }

  updatePizza(pizza: Pizza): void {
    const newName = prompt("Neuer Name der Pizza", pizza.name);
    if (newName) {
      this.store.dispatch({
        type: 'UPDATE', 
        ...pizza,
        name: newName,
      });
    }
  }

  showIngridients(pizza: Pizza): void {
    alert("Pizza-Zutaten: " + pizza.ingridients.join(', '));
  }

  randomStr(): string { return Math.random().toString(32).substr(2); }
}
