import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NoticationResource } from '../models/notication.model';

@Injectable({
    providedIn: 'root',
})
export class NotificationEndpoint {
    parentUrl = `${environment.apiUrl}/student/noticeboard/latest`;

    constructor(private readonly httpClient: HttpClient) { }

    list(): Observable<{ data: NoticationResource[] }> {
        return this.httpClient.get<{ data: NoticationResource[] }>(`${this.parentUrl}`);
    }
}
