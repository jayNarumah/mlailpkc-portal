import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { ProfilePageComponent } from './modules/pages/profile-page/profile-page.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
            { path: 'modules', loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule) },
            { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
            { path: '', redirectTo: '/pages/landing', pathMatch: 'full' },
            { path: '**', redirectTo: '/pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
