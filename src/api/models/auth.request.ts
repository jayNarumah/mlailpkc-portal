
export class AuthLoginRequestDto {
    username!: string;
    password!: string;
}

export interface AuthLoginResponseDto {
    access_token: string;
    user: AuthLoggedInUserDto;
}

export interface AuthLoggedInUserDto {
    id: number;
    uid: string;
    full_name: string;
    email_address: string;
}

export class ForgotPasswordDto {
    email!: string;
}

export class UpdatePasswordDto {
    password!: string;
}
