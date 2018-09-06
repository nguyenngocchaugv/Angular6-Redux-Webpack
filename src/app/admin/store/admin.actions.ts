import { Action } from "@ngrx/store";
import { Update } from '@ngrx/entity';

import { AdminActionTypes } from "../../shared/constants/AdminActionTypes";
import { User } from "../../models/UserModel";

export class LoadUsersAction implements Action {
    readonly type: string = AdminActionTypes.LOAD_USERS;

    constructor(public payload?: any) { }
}

export class LoadUsersSuccessAction implements Action {
    readonly type: string = AdminActionTypes.LOAD_USERS_SUCCESS;

    constructor(public payload: User[]) { }
}

export class UpdateUser implements Action {
    readonly type: string = AdminActionTypes.UPDATE_USER;

    constructor(public payload: Update<User>) { }
}

export class UpdateUserSuccess implements Action {
    readonly type: string = AdminActionTypes.UPDATE_USER_SUCCESS;

    constructor(public payload: User) { }
}

export class UpdateUserFail implements Action {
    readonly type: string = AdminActionTypes.UPDATE_USER_FAIL;

    constructor(public payload: any) { }
}


/**
 * Actions type
 *
 * @type {Actions}
 */
export type Actions =
    LoadUsersAction |
    LoadUsersSuccessAction |
    UpdateUser |
    UpdateUserSuccess |
    UpdateUserFail;
