import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromRootReducers from '../../store/CoreReducer';
import * as fromAdminReducers from './admin.reducers';

// export interface State extends fromRootReducers.State {
//     admin: fromAdminReducers.State; 
// }

export const reducers = {
    admin: fromAdminReducers.reducer
};
// createFeatureSelector() is used to create a feature selector for any specific state.
export const SelectAdminState = createFeatureSelector<fromAdminReducers.State>('admin');

export const selectUserIds = createSelector(
    SelectAdminState,
    fromAdminReducers.selectUserIds
  );
  export const selectUserEntities = createSelector(
    SelectAdminState,
    fromAdminReducers.selectUserEntities
  );
  export const selectAllUsers = createSelector(
    SelectAdminState,
    fromAdminReducers.selectAllUsers
  );
  export const selectUserTotal = createSelector(
    SelectAdminState,
    fromAdminReducers.selectUserTotal
  );
  export const selectCurrentUserId = createSelector(
    SelectAdminState,
    fromAdminReducers.getSelectedUserId
  );
  
  export const selectCurrentUser = createSelector(
    selectUserEntities,
    selectCurrentUserId,
    (userEntities, userId) => userEntities[userId]
  );