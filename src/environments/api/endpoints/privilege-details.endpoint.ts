import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  PrivilegeClassDto,
  PrivilegeClassListResource,
  PrivilegeDetailPostModel,
} from '../models/privilege-class-list.model';

@Injectable({
  providedIn: 'root',
})
export class PrivilegeDetailsEndpoint {
  baseUrl = `${environment.apiUrl}/admin/privilege-details`;

  constructor(private readonly httpClient: HttpClient) {}

  // add new
  add(payload: PrivilegeDetailPostModel) {
    return this.httpClient.post(`${this.baseUrl}/add`, payload);
  }

  // delete privilege class
  // delete(id: number) {
  //   return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  // }
}
