import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Store } from '@ngrx/store';

import { appLoadingDefaultState } from './store/loading/loading.reducer';
import { AppState } from './store/app.state';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    title = 'e-school';
    documentBlocked: boolean;
    documentBlockedMessage: string | null;


    appLoadingEvents$ = this.appStore.select(state => state.loading);


    constructor(private primengConfig: PrimeNGConfig, private readonly appStore: Store<AppState>) {
        this.documentBlocked = appLoadingDefaultState.state;
        this.documentBlockedMessage = appLoadingDefaultState.label;
    }

    ngOnInit() {
        this.primengConfig.ripple = true;

        this.appLoadingEvents$
            .subscribe({
                next: (state) => {
                    this.documentBlocked = state.state;
                    this.documentBlockedMessage = state.label;
                },
                error: (error) => {
                    this.documentBlocked = appLoadingDefaultState.state;
                    this.documentBlockedMessage = appLoadingDefaultState.label;
                },
            });
    }
}
