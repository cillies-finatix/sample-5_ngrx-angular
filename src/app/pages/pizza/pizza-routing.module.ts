import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PizzaComponent } from './pizza.component';

const routes: Routes = [
  { 
    path: '',
    component: PizzaComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'overview' },
      { path: 'overview', loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule) }, 
      { path: 'details/:pizzaId', loadChildren: () => import('./details/details.module').then(m => m.DetailsModule) }
    ] 
  }, 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PizzaRoutingModule { }
