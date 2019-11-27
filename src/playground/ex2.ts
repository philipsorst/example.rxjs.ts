import {delay, map, switchMap} from 'rxjs/operators';
import {BehaviorSubject, of} from 'rxjs';

const metadata$ = of('metadata').pipe(delay(1000));

const idSource$ = new BehaviorSubject<{ id: number }>({id: 666});
setTimeout(() => idSource$.next({id: 8000}), 1000);
setTimeout(() => idSource$.next({id: 31337}), 2000);

const id$ = metadata$.pipe(
    switchMap(metadata => idSource$),
    map(idSource => idSource.id)
);

id$.subscribe(value => console.log('value', value, new Date()));
