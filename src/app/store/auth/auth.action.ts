import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthLoggedInUserDto } from 'src/api/models/auth.request';

export const AppAuthActions = createActionGroup({
    source: '[Authentication]',
    events: {
        login: props<{ access_token: string; user: AuthLoggedInUserDto }>(),
        update: props<{ phone_number: string }>(),
        logout: emptyProps(),
    },
});
