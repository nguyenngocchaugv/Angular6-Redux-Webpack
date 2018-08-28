import { Action } from "@ngrx/store";

import { AdminActionTypes } from "../../shared/constants/AdminActionTypes";
import { User } from "../../models/UserModel";


/**
 * Get Users
 *
 * @class SignInAction
 * @implements {Action}
 */
export class LoadUsersAction implements Action {
    readonly type: string = AdminActionTypes.LOAD_USERS;

    constructor(public payload?: any) { }
}

/**
 * Get Users Success
 *
 * @class SignInAction
 * @implements {Action}
 */
export class LoadUsersSuccessAction implements Action {
    readonly type: string = AdminActionTypes.LOAD_USERS_SUCCESS;

    constructor(public payload: User[]) { }
}


/**
 * Actions type
 *
 * @type {Actions}
 */
export type Actions =
    LoadUsersAction |
    LoadUsersSuccessAction;
