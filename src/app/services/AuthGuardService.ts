import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import * as Auth from '../auth/store/auth.actions';
import * as fromAuth from '../auth/store/index';
import * as fromAuthActions from '../auth/store/auth.actions';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<fromAuth.State>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    } else {
      const observable = this.store.select(fromAuth.getLoggedIn);
      observable.subscribe(authed => {
      if (!authed) {
        this.store.dispatch(new Auth.SignInRedirectAction());
        return false;
      }
        return true;
      });
      return observable;
    }  
  }
}
