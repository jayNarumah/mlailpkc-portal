import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, of } from "rxjs";
import { Injectable } from "@angular/core";
import { AppAuthActions } from './auth.action';
import { AuthEndpoint } from 'src/app/auth/services/auth.endpoint';

@Injectable()
export class AppAuthEffect {

    loadMovies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AppAuthActions.logout),
            exhaustMap(() => this.authEndpoint.logout()
                .pipe(
                    map(movies => (AppAuthActions.logout())),
                    catchError(() => of({ type: '[Movies API] Movies Loaded Error' }))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private authEndpoint: AuthEndpoint
    ) { }

}
