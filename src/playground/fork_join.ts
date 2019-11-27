import {forkJoin, interval, of} from 'rxjs';
import {finalize, map, startWith, take, tap} from 'rxjs/operators';

const interval$ = interval(1000).pipe(
    startWith(-1),
    map(num => num + 1),
    finalize(() => console.log('Done interval$'))
);

forkJoin({
    'one': interval$.pipe(take(2)),
    'two': of('Immediate')
}).pipe(tap(joined => console.log('joined', joined))).subscribe();
