import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromAuthReducers from '../../auth/store/index';
import { AuthStore } from '../../models/AuthModel';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
    loggedIn$: Observable<boolean>;

    constructor(private store: Store<AuthStore>) {
        this.loggedIn$ = this.store.select(fromAuthReducers.getLoggedIn);
        
    }
    ngOnInit() {
    }

}
