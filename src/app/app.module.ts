import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Store } from '@ngrx/store';
import { State } from './reducers';
import { ReactiveFormsModule } from '@angular/forms';
import { RootStoreModule } from './reducers/root-store.module';
import { HttpClientModule } from '@angular/common/http';
import { PizzenService } from './reducers/pizza-entity.service';


export function getAllOnInit(pizzenService: PizzenService) {
  return () => {
    pizzenService.getAll();
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RootStoreModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: getAllOnInit,
      deps: [PizzenService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
