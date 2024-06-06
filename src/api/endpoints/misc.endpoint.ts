import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StudentPortalFaq } from '../models/misc.model';

@Injectable({
    providedIn: 'root',
})
export class StudentPortalFaqEndpoint {
    parentUrl = `${environment.apiUrl}/student/misc`;

    constructor(private readonly httpClient: HttpClient) {}

    list(): Observable<{ data: StudentPortalFaq[] }> {
        return this.httpClient.get<{ data: StudentPortalFaq[] }>(
            `${this.parentUrl}/faqs`
        );
    }
}
