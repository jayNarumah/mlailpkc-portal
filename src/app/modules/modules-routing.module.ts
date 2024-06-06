import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from '../layout/app.layout.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppLayoutComponent,
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('./dashboard/dashboard.module').then(
                                (m) => m.DashboardModule
                            ),
                    },
                    {
                        path: 'profile',
                        loadComponent: () =>
                            import(
                                './pages/profile-page/profile-page.component'
                            ).then((c) => c.ProfilePageComponent),
                    },
                    {
                        path: 'faqs',
                        loadComponent: () =>
                            import('./pages/faq-page/faq-page.component').then(
                                (c) => c.FaqPageComponent
                            ),
                    },
                    {
                        path: 'course-schedule',
                        loadChildren: () =>
                            import('./courses/courses.module').then(
                                (m) => m.CoursesModule
                            ),
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class ModulesRoutingModule {}
