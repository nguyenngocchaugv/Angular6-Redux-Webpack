import {
    ActionReducerMap,
    ActionReducer,
    MetaReducer
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { RouterStateUrl } from '../utils/Utils';
import { AppSettings } from '../shared/enums/AppSettings';
import * as fromAdminReducer from 'app/admin/store/admin.reducers';

export interface State {
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
    // adminState: fromAdminReducer.AdminState;
}

// ActionReducerMap registers the reducers
export const reducers: ActionReducerMap<State> = {
    routerReducer: fromRouter.routerReducer,
    // adminState: fromAdminReducer.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state: State, action: any): State {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 * ngrx-store-freeze module to prevent any possible attempts to mutate the objects in the store.
 */
export const metaReducers: MetaReducer<State>[] = AppSettings.ENVIRONMENT === 'dev' ? [logger, storeFreeze] : [];
