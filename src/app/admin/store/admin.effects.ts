import { Effect, Actions } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { map, switchMap } from 'rxjs/operators';

import { AdminActionTypes } from '../../shared/constants/AdminActionTypes';
import * as fromAdminActions from './admin.actions';
import { User } from "../../models/UserModel";
import { AdminService } from "app/services/AdminService";

@Injectable()
export class AdminEffects {
    @Effect()
    getCustomers$ = this.action$
        .ofType(AdminActionTypes.LOAD_USERS)
        .pipe(switchMap(() => {
            return this.adminService
            .getUsers()
            .pipe(
                map((users: User[]) => new fromAdminActions.LoadUsersSuccessAction(users))
                );
            })
        );
        
    constructor(private action$: Actions,
                private adminService: AdminService) {}
}