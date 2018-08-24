
// import auth action type
import { AdminActionTypes } from '../../shared/constants/AdminActionTypes';
import { User } from '../../models/UserModel';
import { Actions } from './admin.actions';

export interface AdminState {
    users: User[];
    loading: boolean;
    loaded: boolean;
}

export interface AdminStore {
    admin: AdminState;
}

// import models
const initialState: AdminState = {
    users: [],
    loading: false,
    loaded: false
};

/**
 * Reducer function
 *
 * @function reducer
 * @param {AdminStore} state current state
 * @param {Actions} action incoming action
 */
export function reducer(state: any = initialState, action: Actions): AdminStore {
    switch (action.type) {
        case (AdminActionTypes.GET_USERS_SUCCESS):
            const users = action.payload;
            return {
                ...state,
                users: users
            };
        default: 
            return state;
    }
}

export const getUsers = (state: AdminState) => state.users;


