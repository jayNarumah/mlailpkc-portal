export class UpdatePaymentOptionsResource {
    id!: number;
    allow_cash_payment!: boolean;
    allow_client_cash_payment!: boolean;
    allow_online_payment!: boolean;
    allow_client_online_payment!: boolean;
  }

export class PaymentOptionsSettingResource {    
    allow_cash_payment!: boolean;
    allow_client_cash_payment!: boolean;
    allow_online_payment!: boolean;
    allow_client_online_payment!: boolean;
}