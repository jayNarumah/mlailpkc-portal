import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'landing', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
            { path: 'miscellaneous', loadChildren: () => import('./miscellaneous/miscellaneous.module').then(m => m.MiscellaneousModule) },
        ],
        )
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule {
}
