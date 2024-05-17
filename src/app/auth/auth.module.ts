import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UiModule } from "../ui/ui.module";
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { HeaderPageComponent } from '../pages/landing/header-page/header-page.component';

const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            { path: 'login', component: LoginPageComponent },
            { path: 'register', component: RegistrationPageComponent },
            { path: '', redirectTo: 'login', pathMatch: 'prefix' },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        UiModule,
        CommonModule,
        HeaderPageComponent,
    ],
    declarations: [
        AuthLayoutComponent,
        LoginPageComponent,
        RegistrationPageComponent
    ],
    // providers: [...httpInterceptorProviders]
})
export class AuthModule { }
