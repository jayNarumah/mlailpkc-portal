import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
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

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AppLayoutModule,
        StoreModule.forRoot<AppState>(appReducer),
        EffectsModule.forRoot([AppNotificationEffect]),
        // StoreDevtoolsModule.instrument({
        //     maxAge: 25,
        //     logOnly: environment.production,
        //     autoPause: true,
        // }),
        UiModule,
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
