import {interval} from 'rxjs';

console.log('Hello World');

const interval$ = interval(1000);

interval$.subscribe(() => console.log(new Date()));
