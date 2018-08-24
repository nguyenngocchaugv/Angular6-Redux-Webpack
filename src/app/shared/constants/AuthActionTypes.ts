import { type } from '../../utils/Utils';

export const AuthActionTypes = {
    SIGN_IN: type('[auth] Sign In'),
    SIGN_IN_SUCCESS: type('[auth] Sign In Success'),
    SIGN_IN_ERROR: type('[auth] Sign In Error'),
    SIGN_IN_REDIRECT: type('[auth] Sign In Redirect'),
    SIGN_OUT: type('[auth] Sign Out'),
    SIGN_OUT_SUCCESS: type('[auth] Sign Out Success'),
    SIGN_OUT_ERROR: type('[auth] Sign Out Error'),
    SIGN_UP: type('[auth] Sign Up'),
    SIGN_UP_SUCCESS: type('[auth] Sign Up Success'),
    SIGN_UP_ERROR: type('[auth] Sign Up Error'),
    SET_STATE_SIGNIN: type('[auth] Set State Of Sign In')
};
