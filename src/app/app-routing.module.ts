import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/services/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
            { path: 'modules', loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule), canActivate: [AuthGuard] },
            { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
            { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
            { path: '**', redirectTo: '/pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
