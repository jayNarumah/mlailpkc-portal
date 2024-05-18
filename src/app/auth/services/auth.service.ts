import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { AppAuthActions } from 'src/app/store/auth/auth.action';
import { authSelectAccessToken, authSelectIsLoggedIn, authSelectUser } from 'src/app/store/auth/auth.selectors';


@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isLoggedIn$ = this.appStore.select(authSelectIsLoggedIn);
    public user$ = this.appStore.select(authSelectUser);
    public token$ = this.appStore.select(authSelectAccessToken);

    constructor(private readonly appStore: Store<AppState>) {

    }

    get user() {
        return this.user$;
    }

    get token() {
        return this.token$;
    }

    logout() {
        this.appStore.dispatch(AppAuthActions.logout());
    }
}
