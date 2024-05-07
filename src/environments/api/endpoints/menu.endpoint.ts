import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { MenuResource, UpdateMenuDto } from "../models/menu.model";


@Injectable({
  providedIn: 'root',
})
export class MenuEndpoint {
  baseUrl = `${environment.apiUrl}/admin/menu`;

  constructor(private readonly httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<{ data: MenuResource[] }>(`${this.baseUrl}`);
  }
  create(data: any) {
    return this.httpClient.post<{ data: MenuResource }>(`${this.baseUrl}`, data);
  }
  update(id: number, data: UpdateMenuDto) {
    return this.httpClient.put<{ data: MenuResource }>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

}
