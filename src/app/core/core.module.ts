import { NgModule } from '@angular/core';
import * as fromAngularForms from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

// import core components
import { ShowErrorsComponent } from '../components/show-errors.component';
import { LayoutComponent } from '../components/layout.component';
import { NotFoundPageComponent } from '../components/not-found/not-found-page.component';

// import core directives
import { InputPatternValidatorDirective } from '../shared/directives/InputPatternValidatorDirective';
import { PassWordPatternValidatorDirective } from '../shared/directives/PasswordValidatorDirective';

// import another modules
import { CustomMaterialModule } from './material.module';

import { BaseService } from "../services/BaseService";
import { ApiHelpers } from "../utils/ApiHelpers";
import { GlobalApp } from "../utils/GlobalApps";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SiderbarComponent } from './sidebar/sidebar.component';

const CORE_COMPONENTS = [
    HeaderComponent,
    FooterComponent,
    SiderbarComponent,
    ShowErrorsComponent,
    LayoutComponent,
    NotFoundPageComponent,
    InputPatternValidatorDirective,
    PassWordPatternValidatorDirective
];

@NgModule({
    declarations: CORE_COMPONENTS,
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        
        fromAngularForms.FormsModule,
        fromAngularForms.ReactiveFormsModule,
        CustomMaterialModule
    ],
    exports: CORE_COMPONENTS
})
export class CoreModule {
    static forRoot() {
        return {
            ngModule: CoreModule,
            providers: [
                BaseService,
                GlobalApp,
                ApiHelpers
            ]
        };
    }
}
