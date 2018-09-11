// import @ngrx
import { Action } from '@ngrx/store';

// import models
import { Auth } from '../models/auth.model';
import { User } from '../../admin/models/user.model';
// import auth action type
import { AuthActionTypes } from '../../shared/constants/AuthActionTypes';


/**
 * Sign in
 *
 * @class SignInAction
 * @implements {Action}
 */
export class SignInAction implements Action {
    readonly type: string = AuthActionTypes.SIGN_IN;

    constructor(public payload: Auth) { }
}

/**
 * Sign in success
 *
 * @class SingInSuccessAction
 * @implements {Action}
 * @return {User}
 */
export class SingInSuccessAction implements Action {
    readonly type: string = AuthActionTypes.SIGN_IN_SUCCESS;

    constructor(public payload: { user: User }) { }
}

/**
 * Sign in error
 *
 * @class SignInErrorAction
 * @implements {Action}
 * @returns {any}
 */
export class SignInErrorAction implements Action {
    readonly type: string = AuthActionTypes.SIGN_IN_ERROR;

    constructor(public payload?: any) { }
}

/**
 * Sign in redirect
 *
 * @class SignInRedirectAction
 * @implements {Action}
 * @returns {any}
 */
export class SignInRedirectAction implements Action {
    readonly type: string = AuthActionTypes.SIGN_IN_REDIRECT;

    constructor(public payload?: any) { }
}

/**
 * Sign out action
 *
 * @class SignOutAction
 * @implements {Action}
 * @returns {any}
 */
export class SignOutAction implements Action {
    readonly type: string = AuthActionTypes.SIGN_OUT;

    constructor(public payload?: any) { }
}

/**
 * Sign out success
 *
 * @class SignOutSuccessAction
 * @implements {Action}
 * @returns {any}
 */
export class SignOutSuccessAction implements Action {
    readonly type: string = AuthActionTypes.SIGN_OUT_SUCCESS;

    constructor(public payload?: any) { }
}

/**
 * Sign out error
 *
 * @class SignOutErrorAction
 * @implements {Action}
 * @returns {any}
 */
export class SignOutErrorAction implements Action {
    readonly type: string = AuthActionTypes.SIGN_OUT_ERROR;

    constructor(public payload?: any) { }
}

/**
 * Sign Up
 */
export class SignUpAction implements Action {
    readonly type: string = AuthActionTypes.SIGN_UP;

    constructor(public payload?: any) {}
}

export class SignUpSuccessAction implements Action {
    readonly type: string = AuthActionTypes.SIGN_UP_SUCCESS;

    constructor(public payload?: any) { }
}

export class SignUpErrorAction implements Action {
    readonly type: string = AuthActionTypes.SIGN_UP_ERROR;

    constructor(public payload?: any) { }
}

export class SetStateSignInAction implements Action {
    readonly type: string = AuthActionTypes.SET_STATE_SIGNIN;

    constructor(public payload?: any) { }
}

/**
 * Actions type
 *
 * @type {Actions}
 */
export type Actions =
    SignInAction
    | SingInSuccessAction
    | SignInErrorAction
    | SignInRedirectAction
    | SignOutAction
    | SignOutSuccessAction
    | SignOutErrorAction
    | SignUpAction
    | SignUpSuccessAction
    | SignUpErrorAction
    | SetStateSignInAction;
