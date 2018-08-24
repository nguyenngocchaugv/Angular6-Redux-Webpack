import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import RS from '../../shared/resources/ResourceManager';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'not-found-page',
    templateUrl: './not-found-page.component.html'
})

export class NotFoundPageComponent implements OnInit {
    resource: any;

    ngOnInit() {
        this.resource = RS;
    }
}
