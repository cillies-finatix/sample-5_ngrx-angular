import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fin-pizza',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class PizzaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
