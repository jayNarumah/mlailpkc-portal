import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { CourseScheduleEndpoint } from 'src/api/endpoints/course/course-schedule.endpoint';
import { CourseScheduleResource } from 'src/api/resources/course-schedule.model';
import { CourseSubscriptionResource } from 'src/api/resources/course-subscription.model';
import { AppLoadingService } from 'src/app/store/services/app-loading.service';
import { AppNotificationService } from 'src/app/store/services/app-notification.service';

@Injectable({
    providedIn: 'root'
})
export class MySubscriptionDetailResolver implements Resolve<CourseSubscriptionResource> {
    constructor(
        private readonly courseScheduleEndpoint: CourseScheduleEndpoint,
        private readonly appLoadingService: AppLoadingService,
        private readonly appNotificationService: AppNotificationService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CourseSubscriptionResource> {
        const uid = route.params['uid'];

        this.appLoadingService.startLoading('Fetching data...');
        return this.courseScheduleEndpoint.findSubscribtionByUid(uid)
            .pipe(
                map(data => {
                    this.appLoadingService.stopLoading();
                    return data.data;
                }),
                catchError((error, caught) => {
                    this.appLoadingService.stopLoading();
                    this.appNotificationService.showError({ title: error });
                    return EMPTY;
                }),
            );
    }
}
