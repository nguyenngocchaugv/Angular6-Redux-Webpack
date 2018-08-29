import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromStore  from '../store/index';
import * as fromAdminReducer from '../store/admin.reducers';
import * as fromAdminActions from '../store/admin.actions';
import { User } from '../../models/UserModel';

import * as fromAuthReducer from 'app/auth/store/index';

@Component({
	selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
	pageTitle = 'Dashboard';
	users$: Observable<User[]>;
	aaaa: Observable<boolean>;
	

	constructor(private title: Title,
				private store: Store<fromAdminReducer.AdminStore>) { }

	ngOnInit() {
		this.title.setTitle(this.pageTitle);
		this.store.dispatch(new fromAdminActions.LoadUsersAction());
		this.users$ = this.store.select(fromStore.selectAllUsers);
	
		this.aaaa = this.store.select(fromAuthReducer.getLoggedIn);
	}

}
