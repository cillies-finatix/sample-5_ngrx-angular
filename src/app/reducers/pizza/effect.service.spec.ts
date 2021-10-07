import {TestBed} from "@angular/core/testing";
import {PizzaEffectService} from "./effect.service";
import {provideMockActions} from "@ngrx/effects/testing";
import {Subject} from "rxjs";
import {provideMockStore} from "@ngrx/store/testing";

let actions$$: Subject<any>;
let service: PizzaEffectService;

beforeEach(() => {
   actions$$ = new Subject<any>();
   TestBed.configureTestingModule({
      providers: [
         PizzaEffectService,
          provideMockStore(),
          provideMockActions(() => actions$$)
      ]
   });

   service = TestBed.inject(PizzaEffectService);
});

test('PizzaEffectService', () => {
   expect(service).toBeDefined();
});