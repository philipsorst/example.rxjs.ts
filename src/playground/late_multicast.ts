import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

const fakeApi$ = new Observable<Date>(subscriber => {
    let timeout = setTimeout(() => {
        subscriber.next(new Date());
        subscriber.complete();
    }, 100);

    return () => clearTimeout(timeout);
});

const sharedApi$ = fakeApi$.pipe(shareReplay());

sharedApi$.subscribe(date => console.log(date));

setTimeout(() => sharedApi$.subscribe(date => console.log(date)), 500);
