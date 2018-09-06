
import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity'

// import auth action type
import { AdminActionTypes } from '../../shared/constants/AdminActionTypes';
import { User } from '../../models/UserModel';
import { Actions } from './admin.actions';

export interface State extends EntityState<User> {
    selectedUserId: number | null;
    loading: boolean;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
    selectedUserId: null,
    loading: false
});

export interface AdminStore {
    admin: State;
}

/**
 * Reducer function
 *
 * @function reducer
 * @param {AdminStore} state current state
 * @param {Actions} action incoming action
 */
export function reducer(state: any = initialState, action: Actions): State {
    switch (action.type) {
        case AdminActionTypes.ADD_USER_SUCCESS: {
            return adapter.addOne(action.payload.user, state);
        }

        case AdminActionTypes.UPDATE_USER_SUCCESS: {
            return adapter.updateOne(action.payload.user, state);
        }
    
        case AdminActionTypes.DELETE_USER: {
            return adapter.removeOne(action.payload.id, state);
        }
    
        case AdminActionTypes.LOAD_USERS_SUCCESS: {
            return adapter.addAll(action.payload, state);
        }
          
        default: {
            return state;
        }
    }
}

export const getSelectedUserId = (state: State) => state.selectedUserId;

// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

// select the array of user ids
export const selectUserIds = selectIds;

// select the dictionary of user entities
export const selectUserEntities = selectEntities;

// select the array of users
export const selectAllUsers = selectAll;

// select the total user count
export const selectUserTotal = selectTotal;

