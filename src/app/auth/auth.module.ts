import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromAngularForms from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';

import { AuthService } from '../services/AuthService';
import { AuthEffects } from './store/auth.effects';
import { SigninComponent } from './signin/signin.component';
import { LoginFormComponent } from './signin/login-form/login-form.component';
import { reducers } from './store/index';
import { CoreModule } from '../core/core.module';
import { SignupComponent } from './signup/signup.component';

const COMPONENTS = [
    SigninComponent,
    LoginFormComponent,
    SignupComponent
];

@NgModule({
    exports: COMPONENTS,
    imports: [
        CommonModule,
        fromAngularForms.FormsModule,
        fromAngularForms.ReactiveFormsModule,
        RouterModule,
        
        CoreModule,
        StoreModule.forFeature('auth', reducers), // The forFeature(...) method merges an object to the root state
        EffectsModule.forFeature([AuthEffects])

    ],
    declarations: COMPONENTS,
    // providers: [AuthService]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuthModule,
            providers: [
                AuthService
            ]
        };
    }
}
