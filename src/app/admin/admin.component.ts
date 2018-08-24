import { Component, OnInit } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { fadeInAnimation } from '../_animations/fade-in.animation';
import { AuthStore } from '../models/AuthModel';
import * as fromAuthActions from '../auth/store/auth.actions';
import { ModalService } from '../services/modal.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    animations: [fadeInAnimation]
})

export class AdminComponent implements OnInit {
    collapedSideBar: boolean;
    bodyText: string;

    constructor(private store: Store<AuthStore>,
                private idle: Idle, 
                private keepalive: Keepalive,
                private modalService: ModalService) {
                    
         // sets an idle timeout of 5 seconds, for testing purposes.
        idle.setIdle(300);
        // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        idle.setTimeout(15);
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
        idle.onIdleEnd.subscribe(() => {
            this.modalService.close();
        });
        idle.onTimeout.subscribe(() => {
            this.store.dispatch(new fromAuthActions.SignOutAction());
        });
        idle.onTimeoutWarning.subscribe(
            (countdown) => {
                this.modalService.open();
                this.bodyText = 'You will time out in ' + countdown + ' seconds!';
            }
        );
        this.idle.watch();

    }

    ngOnInit() {
    }
    
    getState(outlet: RouterOutlet) {
        return outlet.activatedRouteData.state;
    }

    receiveCollapsed($event: any) {
        this.collapedSideBar = $event;
    }
}
