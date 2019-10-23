import {interval} from 'rxjs';
import {finalize, map, startWith, take} from 'rxjs/operators';

const interval$ = interval(1000).pipe(
    startWith(-1),
    map(num => num + 1),
    finalize(() => console.log('Done interval$'))
);

/* Alternative: */
// const interval$ = timer(0, 1000).pipe(
//     finalize(() => console.log('Done interval$'))
// );

const take10Interval$ = interval$.pipe(
    take(10),
    finalize(() => console.log('Done take10Interval$'))
);

console.log('Right before subscription', new Date());
take10Interval$.subscribe((num) => console.log(num, new Date()));
