import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  PrivilegeClassDto,
  PrivilegeClassListResource,
} from '../models/privilege-class-list.model';

@Injectable({
  providedIn: 'root',
})
export class PrivilegeClassListEndpoint {
  baseUrl = `${environment.apiUrl}/admin/privilege-class`;

  constructor(private readonly httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<{ data: PrivilegeClassListResource[] }>(`${this.baseUrl}`);
  }

  // add new
  create(payload: PrivilegeClassDto) {
    return this.httpClient.post<{ data: PrivilegeClassListResource }>(
      `${this.baseUrl}`,
      payload
    );
  }

  // delete privilege class
  // delete(id: number) {
  //   return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  // }
}
