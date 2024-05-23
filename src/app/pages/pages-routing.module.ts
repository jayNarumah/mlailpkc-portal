import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './notfound/notfound.component';
import { CourseSchedulesListPageComponent } from '../modules/courses/course-schedules-list-page/course-schedules-list-page.component';
import { CourseScheduleDetailsPageComponent } from '../modules/courses/course-schedule-details-page/course-schedule-details-page.component';
import { CourseScheduleDetailResolver } from '../modules/courses/resolvers/course-schedule-details.resolver';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'landing', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
            { path: 'not-found', component: NotfoundComponent },
        ],
        )
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule {
}
