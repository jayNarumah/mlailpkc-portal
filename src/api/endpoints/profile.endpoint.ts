import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserResource } from '../resources/user.model';
import { UpdatePasswordDto } from '../models/auth.request';

@Injectable({
    providedIn: 'root',
})
export class ProfileEndpoint {
    parentUri = `${environment.apiUrl}/student`;

    constructor(private readonly httpClient: HttpClient) { }

    myProfile(): Observable<{ data: UserResource }> {
        return this.httpClient.get<{ data: UserResource }>(
            `${this.parentUri}/profile/info`,
        );
    }

    update(phone_number: string): Observable<{ data: string }> {
        return this.httpClient.post<{ data: string }>(
            `${this.parentUri}/profile/info`, { phone_number }
        );
    }

    changePassword(payload: UpdatePasswordDto): Observable<{ data: string }> {
        return this.httpClient.post<{ data: string }>(
            `${this.parentUri}/profile/change-password`, payload
        );
    }
}
