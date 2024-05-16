import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    SignupRequestDto,
    SignupResponseDto,
} from '../models/api/registration.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class RegistrationEndpoint {
    parentUri = `${environment.apiUrl}/student/registration`;

    constructor(private readonly httpClient: HttpClient) { }

    signup(data: SignupRequestDto): Observable<SignupResponseDto> {
        return this.httpClient.post<SignupResponseDto>(
            `${this.parentUri}/signup`,
            data
        );
    }
}
