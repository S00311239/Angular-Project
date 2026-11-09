import { Observable, catchError, map, of, startWith } from 'rxjs';

export type LoadState<T> =
| { status: 'loading' }
| { status: 'loaded'; data: T }
| { status: 'error'; message: string };

// Wraps any observable so it emits loading, then loaded or error
export function withLoadState<T>(source: Observable<T>):
Observable<LoadState<T>> {

    // run operator one after anohter, ops uses results from previous one
    return source.pipe(
        // map changes each value that passes through
        map((data): LoadState<T> => ({ status: 'loaded', data })),
        startWith<LoadState<T>>({ status: 'loading' }),
        
        // of = creates an observable that mits the values you give it
        catchError((err: Error) => of<LoadState<T>>({ status: 'error', message:
            err.message })
        ),
    );
}