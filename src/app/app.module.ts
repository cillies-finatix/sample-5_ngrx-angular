import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Store } from '@ngrx/store';
import { State } from './reducers';
import { ReactiveFormsModule } from '@angular/forms';
import * as fromPizzaActions from './reducers/pizza/actions';
import { RootStoreModule } from './reducers/root-store.module';

export function dispatchReadOnInit(store: Store<State>) {
  return () => {
    store.dispatch(fromPizzaActions.read());
  };
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RootStoreModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: dispatchReadOnInit,
      deps: [Store],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
