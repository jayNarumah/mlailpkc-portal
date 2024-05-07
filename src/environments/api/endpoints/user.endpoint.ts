import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResource } from 'src/app/main/auth/auth.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserEndpoint {
  baseUrl = `${environment.apiUrl}/admin`;

  constructor(private readonly httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<UserResource[]>(`${this.baseUrl}/users`);
  }

  toggleStatus(id: number) {
    return this.httpClient.get<UserResource>(`${this.baseUrl}/user/toggle/${id}`);
  }
}
