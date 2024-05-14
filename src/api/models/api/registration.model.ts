export interface SignupRequestDto {
    full_name: string;
    email_address: string;
    phone_number: string;
    gender: string;
    category_uid: string;
}

export interface SignupResponseDto {
    message: string;
    email_address: string;
    email_verification_required: boolean;
}
