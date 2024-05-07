import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { UserResource } from "src/api/resources/user.model";

export const AppAuthActions = createActionGroup({
    source: '[Authentication]',
    events: {
        'login': props<{ access_token: string, user: UserResource }>(),
        'logout': emptyProps(),
    },
});
