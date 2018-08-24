import {Component, ChangeDetectionStrategy, OnInit, AfterViewInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import { Router, NavigationStart, NavigationEnd, NavigationCancel, RouterEvent, NavigationError } from '@angular/router';

import * as fromAuthReducers from './auth/store/index';
import * as fromAuthActions from './auth/store/auth.actions';
import * as fromStore from './auth/store/auth.reducers';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent {
    loggedIn$: Observable<boolean>;
    loading = true;

    constructor(private store: Store<fromStore.AuthStore>,
                private router: Router) {
        this.loggedIn$ = this.store.select(fromAuthReducers.getLoggedIn);
        this.router.events.subscribe((event: RouterEvent) => {
            this.navigationInterceptor(event);
        });
        if (localStorage.getItem('currentUser')) {
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.store.dispatch(new fromAuthActions.SetStateSignInAction(currentUser));
        }
    }

    ngOnInit() {
    }
    
    // Shows and hides the loading spinner during RouterEvent changes
    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.loading = true;
        }
        if (event instanceof NavigationEnd) {
            this.loading = false;
        }

        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
            this.loading = false;
        }
        if (event instanceof NavigationError) {
            this.loading = false;
        }
    }
}

