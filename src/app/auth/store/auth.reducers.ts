// import ui util
import { UIUtils } from '../../utils/UIUtils';

// import auth actions
import { Actions } from '../../auth/store/auth.actions';

// import auth action type
import { AuthActionTypes } from '../../shared/constants/AuthActionTypes';
import { Auth } from 'app/models/AuthModel';



/**
* AuthStore
*
* @interface State
*/
export interface AuthState {
    loggedIn: boolean;
    user: Auth | null;
    error: any | null;
    loading: boolean;
}

export const initialState: AuthState = {
    loggedIn: false,
    user: null,
    error: null,
    loading: false
};

/**
 * Reducer function
 *
 * @function reducer
 * @param {AuthStore} state current state
 * @param {Actions} action incoming action
 */
export function reducer(state: any = initialState, action: Actions): AuthState {
    switch (action.type) {
        case AuthActionTypes.SIGN_IN: {
            return {
                ...state,
                error: null,
                loading: true
            };
        }

        case AuthActionTypes.SIGN_IN_SUCCESS: {
            return {
                ...state,
                loggedIn: true,
                user: action.payload.user,
                error: null,
                loading: false
            };
        }

        case AuthActionTypes.SIGN_IN_ERROR: {
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        }
        case AuthActionTypes.SIGN_OUT: {
            return {
                ...state,
                error: null,
                loggedIn: false
            };
        }

        case AuthActionTypes.SIGN_UP: {
            return {
                ...state,
                error: null,
                loading: true
            };
        }
        case AuthActionTypes.SIGN_UP_SUCCESS: {
            return {
                ...state,
                error: null,
                loading: false
            };
        }
        case AuthActionTypes.SIGN_UP_ERROR: {
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        }
        case AuthActionTypes.SET_STATE_SIGNIN: {
            return {
                ...state,
                error: null,
                user: action.payload,
                loading: false,
                loggedIn: true
            };
        }
        default: {
            return state;
        }
    }
}

export const getError = (state: AuthState) => state.error;
export const getLoading = (state: AuthState) => state.loading;
export const getLoggedIn = (state: AuthState) => state.loggedIn;
export const getUser = (state: AuthState) => state.user;
