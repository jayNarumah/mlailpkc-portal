import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseScheduleResource } from 'src/api/resources/course-schedule.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CourseScheduleEndpoint {
    parentUri = `${environment.apiUrl}/student/courses`;

    constructor(private readonly httpClient: HttpClient) { }

    list(): Observable<{ data: CourseScheduleResource[] }> {
        return this.httpClient.get<{ data: CourseScheduleResource[] }>(`${this.parentUri}/list`);
    }

    findByUid(uid: string): Observable<{ data: CourseScheduleResource }> {
        return this.httpClient.get<{ data: CourseScheduleResource }>(`${this.parentUri}/find/${uid}`);
    }

    subscribe(course_session_uid: string): Observable<{ data: CourseScheduleResource }> {
        return this.httpClient.post<{ data: CourseScheduleResource }>(`${this.parentUri}/subscribe`, { course_session_uid });
    }
}
