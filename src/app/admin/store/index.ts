import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as fromRootReducers from '../../store/CoreReducer';
import * as fromAdminReducers from './admin.reducers';

export const reducers = {
    admin: fromAdminReducers.reducer
};
// createFeatureSelector() is used to create a feature selector for any specific state.
export const SelectAdminState = createFeatureSelector<fromAdminReducers.AdminStore>('admin');

export const selectAdminStore = createSelector(
    SelectAdminState,
    (state: fromAdminReducers.AdminStore) => state.admin
)

export const selectUserIds = createSelector(
    selectAdminStore,
    fromAdminReducers.selectUserIds
  );
  export const selectUserEntities = createSelector(
    selectAdminStore,
    fromAdminReducers.selectUserEntities
  );
  export const selectAllUsers = createSelector(
    selectAdminStore,
    fromAdminReducers.selectAllUsers
  );
  export const selectUserTotal = createSelector(
    selectAdminStore,
    fromAdminReducers.selectUserTotal
  );
  export const selectCurrentUserId = createSelector(
    selectAdminStore,
    fromAdminReducers.getSelectedUserId
  );
  
  export const selectCurrentUser = createSelector(
    selectUserEntities,
    selectCurrentUserId,
    (userEntities, userId) => userEntities[userId]
  );