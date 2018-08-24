import { Action } from "@ngrx/store";

import { AdminActionTypes } from "../../shared/constants/AdminActionTypes";
import { User } from "../../models/UserModel";


/**
 * Get Users
 *
 * @class SignInAction
 * @implements {Action}
 */
export class GetUsersAction implements Action {
    readonly type: string = AdminActionTypes.GET_USERS;

    constructor(public payload?: any) { }
}

/**
 * Get Users Success
 *
 * @class SignInAction
 * @implements {Action}
 */
export class GetUsersSuccessAction implements Action {
    readonly type: string = AdminActionTypes.GET_USERS_SUCCESS;

    constructor(public payload: User[]) { }
}


/**
 * Actions type
 *
 * @type {Actions}
 */
export type Actions =
    GetUsersAction |
    GetUsersSuccessAction;
