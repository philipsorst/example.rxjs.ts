import {Observable} from 'rxjs';

const observable1$ = new Observable(subscriber => {
    subscriber.next('Welcome');
    subscriber.complete();

    return () => console.log('Bye bye');
});

const subscription1 = observable1$.subscribe(
    val => console.log(val),
    (error) => console.error(error),
    () => console.log('We\'re done here')
);

console.log('------');

const observable2$ = new Observable(subscriber => {
    subscriber.error('The fuck?');
    subscriber.complete();

    return () => console.log('Bye bye');
});

const subscription2 = observable2$.subscribe(
    val => console.log(val),
    (error) => console.error(error),
    () => console.log('We\'re done here')
);
