import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { UpdatePaymentOptionsResource } from "../models/payment-settings.model";

@Injectable({
    providedIn: 'root'
})

export class PaymentSettingsEndpoint {
    baseUrl = `${environment.apiUrl}/admin/payment-settings`;  // add correct endpoint url for payment settings

    constructor(
        private httpClient: HttpClient,
    ){};
    
    get(){
        return this.httpClient.get<{ data: UpdatePaymentOptionsResource }>(`${this.baseUrl}/1`);
    }

    update(id: number, data: UpdatePaymentOptionsResource ){
        return this.httpClient.put<{ data: UpdatePaymentOptionsResource}>(`${this.baseUrl}/${id}`, data)
    }

}