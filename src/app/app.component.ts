import { Component, TrackByFunction } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Pizza, State } from './reducers';
import { selectAllPizza } from './reducers/index';

@Component({
  selector: 'fin-root',
  template: `
    <div style="text-align:center" class="content">
      <h1>
        Hallo Pizza Meister!
      </h1>

      <h2>Erstell' 'ne neue Pizza</h2>
      <section>
        <form [formGroup]="createPizzaForm" (ngSubmit)="createPizza()">
          <input type="text" formControlName="name" />
          <input type="number" formControlName="price" />
          <select multiple="true" formControlName="ingridients">
            <option value="Käse">Käse</option>
            <option value="Salami">Salami</option>
            <option value="Schinken">Schinken</option>
            <option value="Ananas">Ananas</option>
            <option value="Tomatensoße">Tomatensoße</option>
          </select>
          <button type="submit">Pizza erstellen</button>
        </form>

        <pre>{{createPizzaForm.value|json}}</pre>
      </section>
      
      <p>Pizza-Sortiment:</p>
      <ul>
        <li *ngFor="let pizza of pizza$|async; trackBy: trackByName">
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
  styles: []
})
export class AppComponent {
  pizza$ = this.store.select(selectAllPizza);
  createPizzaForm = this.fb.group({
    name: this.fb.control(''),
    price: this.fb.control(''),
    ingridients: this.fb.control([]),
  });
  
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
    alert("Pizzavoid-Zutaten: " + pizza.ingridients.join(', '));
  }
}
