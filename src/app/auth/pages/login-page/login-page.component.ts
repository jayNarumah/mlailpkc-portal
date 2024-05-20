import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Message } from 'primeng/api';
import { AppState } from 'src/app/store/app.state';
import { AppLoadingService } from 'src/app/store/services/app-loading.service';
import { AppNotificationService } from 'src/app/store/services/app-notification.service';
import { AuthService } from '../../services/auth.service';
import { AppAuthActions } from 'src/app/store/auth/auth.action';
import { ReportModel } from 'src/api/models/report.model';
import { AuthEndpoint } from '../../services/auth.endpoint';
import { ApiError, HttpClientResponseError } from 'src/api/models/api-interfaces';

@Component({
    selector: 'inventory-platform-budgeting-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    submitted = false;
    loading = false;
    errorMessage = '';
    successMessage = '';
    loginForm = this._getLoginFormDef();
    msg: Message[] = [];
    reset = false;
    visible = false;
    message?: ReportModel;
    complete = false;
    declined = false;
    login = true;

    constructor(
        private readonly fb: FormBuilder,
        private readonly authEndpoint: AuthEndpoint,
        private readonly appStore: Store<AppState>,
        private readonly router: Router,
        private readonly appNotificationService: AppNotificationService,
        private readonly appLoadingService: AppLoadingService
    ) { }

    ngOnInit(): void {
        this.logout();
    }

    doLogin() {
        const formData = {
            username: this.loginForm.value.username ?? '',
            password: this.loginForm.value.password ?? '',
        };
        this.loading = true;
        this.appLoadingService.startLoading('Login . . .');
        this.authEndpoint.login(formData).subscribe({
            next: (response) => {
                this.appLoadingService.stopLoading();
                // Set logged-in state
                this.appStore.dispatch(
                    AppAuthActions.login({
                        access_token: response.data.access_token,
                        user: response.data.user,
                    })
                );

                // Show toast
                this.appNotificationService.showSuccess({
                    title: 'Login Successful!',
                    detail: `Welcome back, ${response.data.user.full_name}`,
                });
                this.loading = false;
                this.appLoadingService.stopLoading();
                setTimeout(() => {
                    this.router.navigate(['/modules']);
                }, 2000);

            },
            error: (error) => {
                const apiError = error;
                this.appLoadingService.stopLoading();

                this._setErrorMessage(apiError);
                this.declined = true;
            },
        });
    }

    private _getLoginFormDef() {
        return this.fb.group({
            username: this.fb.control<string>('', [
                Validators.required,
                Validators.email,
            ]),
            password: this.fb.control<string>('', [
                Validators.required,
                Validators.minLength(8),
            ]),
        });
    }

    private _setErrorMessage(message: string) {
        this.msg = [
            {
                severity: 'error',
                summary: message,
            },
        ];
    }

    logout() {
        this.appStore.dispatch(AppAuthActions.logout());
    }
}
