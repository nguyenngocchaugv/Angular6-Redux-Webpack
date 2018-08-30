import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromAuthReducers from '../../auth/store/index';
import * as fromAuthStore from 'app/auth/store/auth.reducers';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
    loggedIn$: Observable<boolean>;

    constructor(private store: Store<fromAuthStore.AuthStore>) {
        this.loggedIn$ = this.store.select(fromAuthReducers.getLoggedIn);
        
    }
    ngOnInit() {
    }

}
