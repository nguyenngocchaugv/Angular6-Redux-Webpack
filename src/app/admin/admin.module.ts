import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingComponent } from './setting/setting.component';
import { CoreModule } from '../core/core.module';
import { PageHeaderComponent } from '../shared/modules/page-header.component';
import { ModalService } from '../services/modal.service';
import { ModalComponent } from '../shared/directives/modal-dialog/modal.component';
import { reducers } from './store/index';
import { AdminEffects } from './store/admin.effects';
import { AdminService } from './services/admin.service';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        CoreModule,
        StoreModule.forFeature('admin', reducers), //register reducer
        EffectsModule.forFeature([AdminEffects]),
        NgbModule
    ],
    declarations: [
        AdminComponent,
        DashboardComponent,
        SettingComponent,
        PageHeaderComponent,
        ModalComponent
    ],
    providers: [
        AdminService,
        ModalService
    ]
})
export class AdminModule {}
