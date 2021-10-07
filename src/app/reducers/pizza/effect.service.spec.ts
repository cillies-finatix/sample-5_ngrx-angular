import {TestBed} from "@angular/core/testing";
import {LOCAL_STORAGE_KEY, PizzaEffectService} from "./effect.service";
import {provideMockActions} from "@ngrx/effects/testing";
import {Subject} from "rxjs";
import {provideMockStore} from "@ngrx/store/testing";
import * as fromPizzaActions from "./actions";
import {Pizza} from "./reducer";

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

afterEach(() => localStorage.clear());

test('PizzaEffectService', () => {
   expect(service).toBeDefined();
});

test('read$ - should read pizzen from storage', done => {
   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([
      {
         name: 'Pizza Salami',
         price: 11.99,
         ingridients: ['Zucker'],
      }
   ] as Pizza[]));

   service.read$.subscribe(readSuccessAction => {
      expect(readSuccessAction.type).toEqual(fromPizzaActions.PizzaAction.READ_SUCCESS);
      expect(readSuccessAction.list).toBeDefined();
      expect(readSuccessAction.list.length).toEqual(1);
      expect(readSuccessAction.list[0].name).toEqual('Pizza Salami');
      done();
   });

   actions$$.next(fromPizzaActions.read());
});