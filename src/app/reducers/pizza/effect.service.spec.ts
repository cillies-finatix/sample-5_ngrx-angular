import {TestBed} from "@angular/core/testing";
import {LOCAL_STORAGE_KEY, PizzaEffectService} from "./effect.service";
import {provideMockActions} from "@ngrx/effects/testing";
import {Subject} from "rxjs";
import {provideMockStore} from "@ngrx/store/testing";
import * as fromPizzaActions from "./actions";
import {Pizza, PizzaState} from "./reducer";

describe('PizzaEffectService', () => {
    let actions$$: Subject<any>;
    let service: PizzaEffectService;

    beforeEach(() => {
        actions$$ = new Subject<any>();
        TestBed.configureTestingModule({
            providers: [
                PizzaEffectService,
                provideMockStore({
                    initialState: {
                        pizza: {
                            ids: [1],
                            entities: {
                                1: {
                                    id: 1,
                                    name: 'Pizza Hawaii',
                                    price: 12.99,
                                    ingridients: [
                                        'Ananas',
                                        'Schinken',
                                        'Käse',
                                    ]
                                }
                            }
                        } as PizzaState
                    }
                }),
                provideMockActions(() => actions$$)
            ]
        });

        service = TestBed.inject(PizzaEffectService);
    });

    afterEach(() => localStorage.clear());

    test('should be created', () => {
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

    test('changes$ - should store pizzen to storage', done => {
        service.changes$.subscribe(() => {
            const rawPizzen = localStorage.getItem(LOCAL_STORAGE_KEY);
            expect(rawPizzen).toBeDefined();
            const pizzenList = JSON.parse(`${rawPizzen}`);
            expect(pizzenList).toBeDefined();
            expect(pizzenList.length).toEqual(1);
            expect(pizzenList[0].name).toEqual('Pizza Hawaii');
            expect(pizzenList[0].ingridients.length).toEqual(3);
            done();
        });

        // note: there are no reducer registered for this test!
        // the actual result is provided by "provideMockStore" from above.
        actions$$.next(fromPizzaActions.create({id: 1, name: 'Pizza Mocked', price: 9.99, ingridients: ['Mocked']}));
    });
});