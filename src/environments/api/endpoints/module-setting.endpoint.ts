import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment"
import { UpdateMenuDto } from "../models/menu.model";
import { ModuleResource } from "../models/module.model";


@Injectable({
  providedIn: 'root',
})
export class ModuleEndpoint {
  baseUrl = `${environment.apiUrl}/admin/module`;

  constructor(private readonly httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<{ data: ModuleResource[] }>(`${this.baseUrl}`);
  }

}
