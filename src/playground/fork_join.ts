import {forkJoin, interval, of} from 'rxjs';
import {finalize, map, startWith, take} from 'rxjs/operators';

const interval$ = interval(1000).pipe(
    startWith(-1),
    map(num => num + 1),
    finalize(() => console.log('Done interval$'))
);

/* Takes the last value of each observable */
forkJoin([
    interval$.pipe(take(2)),
    of('Immediate')
]).subscribe({
    next: value => console.log('Next:', value),
    error: error => console.error('Error:', error),
    complete: () => console.log('Completed')
});
