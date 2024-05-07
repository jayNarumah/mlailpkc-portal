import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { UserNotificationResource } from "../models/user-notification.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class UserNotificationEndpoint {
    apiBaseUrl = environment.apiUrl;

    constructor(private readonly httpClient: HttpClient) { }

    list() {
        return this.httpClient.get<{ data: UserNotificationResource[] }>(`${this.apiBaseUrl}/user-notification`)
    }

    create(payload: any): Observable<any> {
        return this.httpClient.post<{ data: UserNotificationResource }>(`${this.apiBaseUrl}/user-notification`, payload);
    }
}
