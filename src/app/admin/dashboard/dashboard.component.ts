import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromStore  from '../store/admin.reducers';
import * as fromAdminReducer from '../store/index';
import * as fromAdminActions from '../store/admin.actions';
import { User } from '../../models/UserModel';

@Component({
	selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
	pageTitle = 'Dashboard';
	adminState$: Observable<User[]>;

	constructor(private title: Title,
				private store: Store<fromStore.AdminStore>) { }

	ngOnInit() {
		this.title.setTitle(this.pageTitle);
		this.store.dispatch(new fromAdminActions.GetUsersAction());
		this.adminState$ = this.store.select(fromAdminReducer.getUsers);
	}

}
