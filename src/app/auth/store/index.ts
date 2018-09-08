import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromRootReducers from '../../store/CoreReducer';
import * as fromAuthReducers from './auth.reducers';


export interface AuthState {
    auth: fromAuthReducers.AuthState;
}

export interface State extends fromRootReducers.State {
    auth: AuthState;
}

export const reducers = {
    auth: fromAuthReducers.reducer
};

export const selectAuthReducer = createFeatureSelector<AuthState>('auth');

export const selectAuthStore = createSelector(
    selectAuthReducer,
    (state: AuthState) => state.auth
);

export const getLoggedIn = createSelector(
    selectAuthStore,
    fromAuthReducers.getLoggedIn
);

export const getUser = createSelector(
    selectAuthStore,
    fromAuthReducers.getUser
);

export const getSignInError = createSelector(
    selectAuthStore,
    fromAuthReducers.getError
);

export const getSignInLoading = createSelector(
    selectAuthStore,
    fromAuthReducers.getLoading
);