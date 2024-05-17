import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'landing', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
            { path: 'not-found', component: NotfoundComponent }
        ],
        )
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule {
}
