import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { of } from 'rxjs/observable/of';
import { map, tap, catchError, exhaustMap, switchMap, mergeMap} from 'rxjs/operators';

import { AuthService } from '../../services/AuthService';
import { AuthActionTypes } from '../../shared/constants/AuthActionTypes';
import * as fromAuthActions from './auth.actions';

// import auth action
import {
    SignInAction,
    SingInSuccessAction,
    SignInErrorAction,
    SignInRedirectAction
} from './auth.actions';
import { Auth } from '../../models/AuthModel';

@Injectable()
export class AuthEffects {
    @Effect()
    signIn$ = this.actions$
        .ofType(AuthActionTypes.SIGN_IN)
        .pipe(map((action: fromAuthActions.SignInAction) => {
            return action.payload;
        })
        , exhaustMap((auth: Auth) => 
            this.authService.login(auth)
            .pipe(
                map((user: any) => new fromAuthActions.SingInSuccessAction({ user })),
                catchError(error => of(new fromAuthActions.SignInErrorAction(error)))
                )
            )
        );

    @Effect({dispatch: false})
    signInSuccess$ = this.actions$
        .ofType(AuthActionTypes.SIGN_IN_SUCCESS)
        .pipe(tap(() => {
            this.router.navigate(['/dashboard']);
        }));
    
    @Effect({dispatch: false})
    signInError$ = this.actions$
        .ofType(AuthActionTypes.SIGN_IN_ERROR)
        .pipe(map((action: fromAuthActions.SignInErrorAction) => {
                this.toastr.error(action.payload);
        }));

    @Effect({dispatch: false})
    signInRedirect$ = this.actions$
        .ofType(AuthActionTypes.SIGN_IN_REDIRECT)
        .pipe(tap(authed => {
            this.router.navigate(['/sign-in']);
        }));

    @Effect({dispatch: false})
    signOut$ = this.actions$
        .ofType(AuthActionTypes.SIGN_OUT)
        .pipe(tap(_ => {
            this.authService.logout();
            this.router.navigate(['/sign-in']);
          }
        ));

    @Effect()
    signUp$ = this.actions$
        .ofType(AuthActionTypes.SIGN_UP)
        .pipe(map((action: fromAuthActions.SignUpAction) => {
            return action.payload;
        }),
        exhaustMap((user: Auth) => 
            this.httpClient.post('/users/register', user)
                .pipe(
                    map(() => new fromAuthActions.SignUpSuccessAction),
                    catchError(error => of(new fromAuthActions.SignUpErrorAction(error)))
                )
        ));
        
    @Effect({dispatch: false})
    signUpSuccess$ = this.actions$
        .ofType(AuthActionTypes.SIGN_UP_SUCCESS)
        .pipe(tap(() => {
            this.toastr.success('User registration successful');
            this.router.navigate(['/sign-in']);
        }));

    @Effect({dispatch: false})
    signUpError$ = this.actions$
        .ofType(AuthActionTypes.SIGN_UP_ERROR)
        .pipe(tap((action: fromAuthActions.SignOutErrorAction) => {
            this.toastr.error(action.payload);
        }));
    
    /**
     * @constructor
     * @param {Actions} actions
     * @param {AuthService} authService
     * @param {Router} router
     */
    constructor(private actions$: Actions,
                private authService: AuthService,
                private router: Router,
                private httpClient: HttpClient,
                private toastr: ToastrService) {
    }
}
