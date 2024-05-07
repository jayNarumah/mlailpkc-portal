import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { DashboardSettingResource } from "../models/dashboard-settings.model";

@Injectable({
  providedIn: 'root',
})
export class DashboardSettingEndpoint {
  baseUrl = `${environment.apiUrl}/admin/dashboard-seeting`;

  constructor(private readonly httpClient: HttpClient) { }

  dashboardStatistics() {
    return this.httpClient.get<{ data: DashboardSettingResource }>(`${this.baseUrl}`);
  }

}
