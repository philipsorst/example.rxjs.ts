import {interval} from 'rxjs';
import {finalize, take} from 'rxjs/operators';

const intervalCount = interval(1000);

const takeFive = intervalCount.pipe(
    take(5),
    finalize(() => console.log('We are done here'))
);

takeFive.subscribe(x => console.log(x));
