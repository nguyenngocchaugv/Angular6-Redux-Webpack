import { Effect, Actions } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { AdminActionTypes } from '../../shared/constants/AdminActionTypes';
import * as fromAdminActions from './admin.actions';
import { User } from "../models/user.model";
import { AdminService } from "../services/admin.service";

@Injectable()
export class AdminEffects {
    @Effect()
    getUsers$ = this.action$
        .ofType(AdminActionTypes.LOAD_USERS)
        .pipe(switchMap(() => {
            return this.adminService
            .getUsers()
            .pipe(
                map((users: User[]) => new fromAdminActions.LoadUsersSuccessAction(users))
                );
            })
        );
    
    @Effect()
    updateUser$ = this.action$
        .ofType(AdminActionTypes.UPDATE_USER).pipe(
            map((action: fromAdminActions.LoadUsersAction) => action.payload),
            switchMap(user => {
                return this.adminService.updateUser(user)
                .pipe(
                    map(user => new fromAdminActions.UpdateUserSuccess(user)),
                    catchError(error => of(new fromAdminActions.UpdateUserFail(error)))
                );
            })
        );
    constructor(private action$: Actions,
                private adminService: AdminService) {}
}