import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './notfound/notfound.component';
import { CourseSchedulesListPageComponent } from './course-schedules-list-page/course-schedules-list-page.component';
import { CourseScheduleDetailsPageComponent } from './course-schedule-details-page/course-schedule-details-page.component';
import { CourseScheduleDetailResolver } from './resolvers/course-schedule-details.resolver';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'landing', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
            { path: 'not-found', component: NotfoundComponent },
            { path: 'course-schedules', component: CourseSchedulesListPageComponent },
            { path: 'course-schedules/details/:uid', component: CourseScheduleDetailsPageComponent, resolve: { data: CourseScheduleDetailResolver } },
        ],
        )
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule {
}
