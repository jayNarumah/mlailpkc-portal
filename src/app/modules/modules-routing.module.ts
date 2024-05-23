import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from '../layout/app.layout.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'profile', component: ProfilePageComponent },
                    { path: 'course-schedule', loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule) },
                ]
            },
        ],)
    ],
    exports: [RouterModule]
})
export class ModulesRoutingModule {
}
