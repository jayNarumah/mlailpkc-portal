import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardStatsDto } from '../models/api/dashboard.model';
import { environment } from 'src/environments/environment';
import { ApiDataResponse } from '../models/api/base.model';

@Injectable({
    providedIn: 'root',
})
export class DashboardEndpoint {
    parentUrl = `${environment.apiUrl}/student/dashboard`;

    constructor(private readonly httpClient: HttpClient) {}

    getDashboardStats(): Observable<ApiDataResponse<DashboardStatsDto>> {
        return this.httpClient.get<ApiDataResponse<DashboardStatsDto>>(
            `${this.parentUrl}/stats`
        );
    }
}
