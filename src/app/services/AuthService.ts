import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { map } from 'rxjs/operators';
import { _throw } from "rxjs/observable/throw";
import { of } from "rxjs/observable/of";
import { HttpClient } from '@angular/common/http';

import {BaseService} from "./BaseService";
import { Auth } from '../models/AuthModel';

@Injectable()
export class AuthService {

    isLogin = new BehaviorSubject<boolean>(false);
    user = new BehaviorSubject<{}>(null);


    constructor(private http_client: HttpClient) {

    }

    /**
     * Set login status
     * @param status
     */
    setLogin(status: any) {
        this.isLogin.next(status);
        this.isLogin.asObservable();
    }

    /**
     * Set user when login
     * @param user
     */
    setUser(user: any) {
        this.user.next(user);
        this.user.asObservable();
    }

    login(auth: Auth) {
        return this.http_client.post<any>(`/users/authenticate`, { username: auth.email, password: auth.password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }


}
