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
import { HttpClientResponseError } from 'src/api/models/api-interfaces';

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
    passwordForm = this._getUpdatePasswordFormDef();
    declined = false;
    msg: Message[] = [];
    must_change_password = false;
    reset = false;
    visible = false;
    message?: ReportModel;
    complete = false;
    login = true;

    constructor(
        private readonly fb: FormBuilder,
        private readonly authEndpoint: AuthEndpoint,
        private readonly appStore: Store<AppState>,
        private readonly router: Router,
        private readonly appNotificationService: AppNotificationService,
        private readonly appLoadingService: AppLoadingService,
    ) { }

    ngOnInit(): void {
        this.logout();

        this.passwordForm.statusChanges.subscribe({
            next: (status) => {
                this.reset = status === 'VALID';
            },
        });
    }

    doLogin() {
        const formData = {
            username: this.loginForm.value.username ?? '',
            password: this.loginForm.value.password ?? '',
        };
        this.loading = true;
        this.appLoadingService.startLoading('Login...');
        this.authEndpoint.login(formData).subscribe({
            next: (response) => {
                this.appLoadingService.startLoading('Loading...');
                // Set logged-in state
                this.appStore.dispatch(
                    AppAuthActions.login({
                        access_token: response.access_token,
                        user: response.user,
                    })
                );

                this.router.navigate(['/']);
                // Show toast
                this.appNotificationService.showSuccess({
                    title: 'Login Successful!',
                    detail: `Welcome back, ${response.user.email_address}`,
                });
                this.loading = false;
                this.declined = false;
                this.appLoadingService.stopLoading();
            },
            error: (error: HttpClientResponseError) => {
                const apiError = error.error.message;
                this.appLoadingService.stopLoading();
                this.appNotificationService.showError({
                    title: apiError.error,
                    detail: apiError.message,
                });

                this._setErrorMessage(apiError.message);
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

    private _getUpdatePasswordFormDef() {
        return this.fb.group(
            {
                password: this.fb.control<string>('', [
                    Validators.required,
                    Validators.minLength(8),
                ]),
                confirmPassword: this.fb.control<string>('', [
                    Validators.required,
                    Validators.minLength(8),
                ]),
            },
            // { validator: MustMatch('password', 'confirmPassword') }
        );
    }

    updatePassword() {
        const formData = {
            password: this.passwordForm.value.password ?? '',
            must_change_password: false,
        };

        this.loading = true;
        this.appLoadingService.startLoading('update...');
        this.authEndpoint.updatePassword(formData).subscribe({
            next: (response) => {
                this.appStore.dispatch(AppAuthActions.logout());
                this.appLoadingService.stopLoading();
                this.loading = false;
                this.must_change_password = false;
                this.loginForm.reset();
                const report: ReportModel = {
                    status: true,
                    message: 'Your password has been reset successfully',
                };
                this.message = report;
                this.complete = true;
            },
            error: (err) => {
                this.loading = false;
                this.complete = true;
                this.must_change_password = false;
                this.appLoadingService.stopLoading();
                this.appNotificationService.showError({
                    title: err.statusText,
                    detail: err.error.message,
                });
                this._setErrorMessage(err.error);
                const report: ReportModel = {
                    status: false,
                    message: 'Password reset failed',
                };
                this.message = report;
            },
        });
    }

    continue() {
        this.login = true;
        this.complete = false;
        this.must_change_password = false;
    }

    // showDialog(report: ReportModel) {
    //     this.message = report;
    //     this.visible = true;
    //     setTimeout(() => {
    //         this.visible = false;
    //     }, 3000);
    // }

    logout() {
        this.appStore.dispatch(AppAuthActions.logout());
    }
}
