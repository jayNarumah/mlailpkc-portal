import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthLoggedInUserDto } from 'src/api/models/auth.request';
import { AppState } from 'src/app/store/app.state';
import { AppAuthActions } from 'src/app/store/auth/auth.action';
import { authSelect } from 'src/app/store/auth/auth.selectors';


@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _isLoggedIn: boolean;
    private _user?: AuthLoggedInUserDto;
    private _token: string = '';

    constructor(private readonly appStore: Store<AppState>) {
        this.appStore.select(authSelect).subscribe({
            next: (state) => {
                this._user = state.user;
                this._token = state.access_token;
                this._isLoggedIn = state.user != null;
            }
        });
    }

    get user() {
        return this._user;
    }

    get token() {
        return this._token;
    }

    get isLoggedIn() {
        return this._isLoggedIn;
    }

    logout() {
        this.appStore.dispatch(AppAuthActions.logout());
    }
}
