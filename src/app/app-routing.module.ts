import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuardService } from './services/AuthGuardService';
import { NotFoundPageComponent } from './components/not-found/not-found-page.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: '../app/admin/admin.module#AdminModule',
        canActivate: [AuthGuardService]
    },
    {
        path: 'sign-in',
        component: SigninComponent
    },
    {
        path: 'sign-up',
        component: SignupComponent
    },
    {
        path: '**',
        component: NotFoundPageComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    providers: [
        AuthGuardService
    ],
    exports: [
        RouterModule
    ]

})

export class AppRoutingModule { }
