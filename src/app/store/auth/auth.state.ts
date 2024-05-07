import { UserResource } from "src/api/resources/user.model";

export interface AppAuthState {
    access_token: string | null;
    user: UserResource | null;
}
