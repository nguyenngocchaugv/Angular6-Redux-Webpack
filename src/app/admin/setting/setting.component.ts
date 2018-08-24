import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'app-setting',
    templateUrl: './setting.component.html'
})
export class SettingComponent implements OnInit {
	pageTitle = 'Setting';

	constructor(private title: Title) { }

	ngOnInit() {
		this.title.setTitle(this.pageTitle);
	}

}
