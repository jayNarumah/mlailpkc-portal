import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { AppState } from './store/app.state';
import { appReducer } from './store/app.reducer';
import { AppNotificationEffect } from './store/notification/app-notification.effect';
import { UiModule } from './ui/ui.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductService } from './demo/service/product.service';
import { JwtInterceptor } from './auth/services/helpers/jwt.interceptor';
import { ErrorInterceptor } from './auth/services/helpers/error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AppLayoutModule,
        StoreModule.forRoot<AppState>(appReducer),
        EffectsModule.forRoot([AppNotificationEffect]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
            autoPause: true,
        }),
        UiModule,
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        ProductService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
