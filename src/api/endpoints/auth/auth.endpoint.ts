import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    AuthLoginRequestDto,
    AuthLoginResponseDto,
} from '../../models/auth.request';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthEndpoint {
    parentUri = '/auth';

    constructor(private readonly httpClient: HttpClient) { }

    login(data: AuthLoginRequestDto): Observable<AuthLoginResponseDto> {
        return this.httpClient.post<AuthLoginResponseDto>(
            `${this.parentUri}/login`,
            data
        );
    }
}
