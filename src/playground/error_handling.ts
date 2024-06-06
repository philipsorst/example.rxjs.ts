import {catchError, EMPTY, interval, Observable, of, throwError} from 'rxjs';
import {map, switchMap, take, tap} from 'rxjs/operators';

const id$ = interval(1000).pipe(
    map(value => value + 1)
);

function getUser(id: number): Observable<string> {
    switch (id) {
        case 1:
            return of('one');
        case 2:
            return throwError(() => new Error('404'));
        case 3:
            return of('three');
        default:
            return throwError(() => new Error('undefined'));
    }
}

id$
    .pipe(
        take(4),
        tap(id => console.log('ID:', id)),
        switchMap(id => getUser(id).pipe(catchError(err => {
                console.error('Error:', err.message);
                return EMPTY;
            }
        ))),
    )
    .subscribe({
        next: user => console.log('User', user),
        error: error => console.error('Unhandled error:', error),
        complete: () => console.log('User subscription completed')
    });
