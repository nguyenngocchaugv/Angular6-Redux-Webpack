import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as fromAuthStore from 'app/auth/store/auth.reducers';
import * as fromAuthActions from '../store/auth.actions';
import * as fromAuthReducers from '../store/index';



@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit {
    registerForm: FormGroup;
    loading$: Observable<boolean>;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private store: Store<fromAuthStore.AuthState>) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
        this.loading$ = this.store.select(fromAuthReducers.getSignInLoading);
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.store.dispatch(new fromAuthActions.SignUpAction(this.registerForm.value));
        // this.userService.register(this.registerForm.value)
        //     .pipe(first())
        //     .subscribe(
        //         data => {
        //             this.alertService.success('Registration successful', true);
        //             this.router.navigate(['/login']);
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         });
    }
}
