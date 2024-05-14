export class AuthLoginRequestDto {
    username!: string;
    password!: string;
}

export interface AuthLoginResponseDto {
    access_token: string;
    user: AuthLoggedInUserDto;
}

export interface AuthLoggedInUserDto {
    uid: string;
    full_nane: string;
    permissions: string[];
}

export class ForgotPasswordDto {
    email!: string;
}

export class UpdatePasswordDto {
    password!: string;
}
