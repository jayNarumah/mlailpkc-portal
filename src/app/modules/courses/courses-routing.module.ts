import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CourseSchedulesListPageComponent } from './course-schedules-list-page/course-schedules-list-page.component';
import { CourseScheduleDetailsPageComponent } from './course-schedule-details-page/course-schedule-details-page.component';
import { CourseScheduleDetailResolver } from './resolvers/course-schedule-details.resolver';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'list', component: CourseSchedulesListPageComponent },
            { path: 'details/:uid', component: CourseScheduleDetailsPageComponent, resolve: { data: CourseScheduleDetailResolver } },
        ],
        )
    ],
    exports: [RouterModule]
})
export class CoursesRoutingModule {
}
