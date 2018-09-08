import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { Auth, initialAuth } from '../../models/AuthModel';

import RS from '../../shared/resources/ResourceManager';
import * as fromAuthActions from '../store/auth.actions';
import * as fromAuthReducers from '../store/index';
import * as fromStore from '../store/auth.reducers';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})

export class SigninComponent implements OnInit {
    resource: any;
    auth: Auth;
    error$: Observable<any>;
    loading$: Observable<boolean>;

    constructor(private store: Store<fromStore.AuthState>,
                private router: Router) { }

    ngOnInit() {
        this.resource = RS;
        this.auth = initialAuth;
        this.loading$ = this.store.select(fromAuthReducers.getSignInLoading);

        if (localStorage.getItem('currentUser')) { 
            this.router.navigate(['/']);
        }
    }

    onSubmit($event: Auth) {
        this.store.dispatch(new fromAuthActions.SignInAction($event));
    }

}
