import {interval, Observable, of, throwError} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

const id$ = interval(1000).pipe(
    map(value => value + 1)
);

function getUser(id: number): Observable<string>
{
    switch (id) {
        case 1:
            return of('one');
        case 2:
            return throwError(new Error('404'));
        case 3:
            return of('three');
        default:
            return throwError(new Error('undefined'));
    }
}

const user$ = id$.pipe(
    switchMap(id => getUser(id)/*pipe(catchError(error => {
        console.warn('We caught this');
        return of(null);
    }))*/
    )
)

user$.subscribe({
    next: console.log,
    error: console.error,
    complete: () => {
        console.log('Completed');
        // // What?
        // id$.subscribe({})
    }
});

id$.subscribe({next: value => console.log('ID: ', value)})
