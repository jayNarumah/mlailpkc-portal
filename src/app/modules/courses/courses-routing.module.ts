import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CourseSchedulesListPageComponent } from './pages/course-schedules-list-page/course-schedules-list-page.component';
import { CourseScheduleDetailsPageComponent } from './pages/course-schedule-details-page/course-schedule-details-page.component';
import { CourseScheduleDetailResolver } from './resolvers/course-schedule-details.resolver';
import { MySubscriptionsComponent } from './pages/my-subscriptions/my-subscriptions.component';
import { MySubscriptionDetailResolver } from './resolvers/my-subscription-detail.resolver';
import { MySubscriptionDetailComponent } from './pages/my-subscription-detail/my-subscription-detail.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'list', component: CourseSchedulesListPageComponent },
            { path: 'details/:uid', component: CourseScheduleDetailsPageComponent, resolve: { data: CourseScheduleDetailResolver } },
            { path: 'subscriptions', component: MySubscriptionsComponent },
            { path: 'subscriptions/details/:uid', component: MySubscriptionDetailComponent },
            // { path: 'subscriptions/details/:uid', component: MySubscriptionDetailComponent, resolve: { data: MySubscriptionDetailResolver } },
        ],
        )
    ],
    exports: [RouterModule]
})
export class CoursesRoutingModule {
}
