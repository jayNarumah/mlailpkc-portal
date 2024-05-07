import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { PrivilegeResource, UpdatePrivilegeDto } from "../models/privilege.model";

@Injectable({
  providedIn: 'root',
})
export class PrivilegeEndpoint {
  baseUrl = `${environment.apiUrl}/admin/privilege`;

  constructor(private readonly httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<{ data: PrivilegeResource[] }>(`${this.baseUrl}`);
  }
  create(data: any) {
    return this.httpClient.post<{ data: PrivilegeResource }>(`${this.baseUrl}`, data);
  }
  update(id: number, data: UpdatePrivilegeDto) {
    return this.httpClient.put<{ data: PrivilegeResource }>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
