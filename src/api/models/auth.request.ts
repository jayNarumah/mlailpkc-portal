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
    full_name: string;
    permissions: string[];
}

export class ForgotPasswordDto {
    email!: string;
}

export class UpdatePasswordDto {
    old_password!: string;
    new_password!: string;
}
