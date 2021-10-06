import { ChangeDetectionStrategy, Component, TrackByFunction } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from './reducers';
import * as fromPizzaActions from './reducers/pizza/actions';

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
    
      <router-outlet></router-outlet>
      
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
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
  
  constructor(private readonly store: Store<State>, private readonly fb: FormBuilder) {}
  
  createPizza(): void {
    this.store.dispatch(fromPizzaActions.create(this.createPizzaForm.value));
    this.createPizzaForm.reset();
  }
}
