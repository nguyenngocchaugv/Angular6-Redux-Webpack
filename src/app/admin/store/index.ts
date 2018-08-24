import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromRootReducers from '../../store/CoreReducer';
import * as fromAdminReducers from './admin.reducers';

export interface State extends fromRootReducers.State {
    admin: fromAdminReducers.AdminStore; 
}

export const reducers = {
    admin: fromAdminReducers.reducer
};
// createFeatureSelector() is used to create a feature selector for any specific state.
export const selectAdminReducer = createFeatureSelector<fromAdminReducers.AdminStore>('admin');

// createSelector() is used to create selector using feature selector.
export const selectAdminStore = createSelector(
    selectAdminReducer,
    (state: fromAdminReducers.AdminStore) => state.admin
);

export const getUsers = createSelector(
    selectAdminStore,
    fromAdminReducers.getUsers
);