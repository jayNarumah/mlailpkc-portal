import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { CourseScheduleEndpoint } from 'src/api/endpoints/course/course-schedule.endpoint';
import { CourseScheduleResource } from 'src/api/resources/course-schedule.model';
import { AppLoadingService } from 'src/app/store/services/app-loading.service';
import { AppNotificationService } from 'src/app/store/services/app-notification.service';

@Injectable({
    providedIn: 'root'
})
export class CourseScheduleDetailResolver implements Resolve<CourseScheduleResource> {
    constructor(
        private readonly courseScheduleEndpoint: CourseScheduleEndpoint,
        private readonly appLoadingService: AppLoadingService,
        private readonly appNotificationService: AppNotificationService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CourseScheduleResource> {
        const uid = route.params['uid'];

        this.appLoadingService.startLoading('Fetching data...');
        return this.courseScheduleEndpoint.findByUid(uid)
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
