import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';

const metadata$ = of(Promise.resolve('loaded'));
const idSubject$ = new BehaviorSubject<{ id: number }>({id: 1});

let seq = 0;

function load(id: number): Observable<{ id: number, date: Date, seq: number }>
{
    console.log('load', id);
    return new Observable<{ id: number, date: Date, seq: number }>(subscriber => {
        let timeout = setTimeout(() => {
            subscriber.next({id: id, date: new Date(), seq: seq});
            seq++;
            subscriber.complete();
        }, 100);

        return () => clearTimeout(timeout);
    });
}

const id$ = metadata$.pipe(
    switchMap(() => idSubject$),
    map(value => value.id)
);

const loaded$ = id$.pipe(
    switchMap(id => load(id)),
    shareReplay(1)
);

const sub1 = loaded$.subscribe((val) => console.log('sub1', val));
let sub2: Subscription;

setTimeout(() => {
    sub2 = loaded$.subscribe((val) => console.log('sub2', val));
}, 500);

setTimeout(() => {
    idSubject$.next({id: 2});
}, 2000);

setTimeout(() => {
    sub1.unsubscribe();
    if (sub2) {
        sub2.unsubscribe();
    }
}, 10000);
