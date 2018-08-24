import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import { TranslateService } from '@ngx-translate/core';

import * as fromAuthReducers from '../../auth/store/index';
import * as fromAuthActions from '../../auth/store/auth.actions';
import * as fromAuthStore from 'app/auth/store/auth.reducers';
import { Auth } from '../../models/AuthModel';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent   {
    loggedIn$: Observable<boolean>;
    user$: Observable<Auth>;
    pushRightClass: string = 'push-right';
    
    constructor(private store: Store<fromAuthStore.AuthStore>,
                private translate: TranslateService) {
        this.loggedIn$ = this.store.select(fromAuthReducers.getLoggedIn);
        
        //Setting locallize
        this.translate.addLangs(['en', 'vn']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|vn/) ? browserLang : 'en');
    }

    ngOnInit() {
        this.user$ = this.store.select(fromAuthReducers.getUser);
    }

    onLogout() {
        this.store.dispatch(new fromAuthActions.SignOutAction());
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }
}
