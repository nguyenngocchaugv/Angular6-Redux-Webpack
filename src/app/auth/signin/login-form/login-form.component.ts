import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as fromAngularForms from '@angular/forms';
import { Auth } from '../../../models/AuthModel';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html'
})

export class LoginFormComponent implements OnInit {
    loginForm: fromAngularForms.FormGroup = new fromAngularForms.FormGroup({
        email: new fromAngularForms.FormControl(''),
        password: new fromAngularForms.FormControl(''),
        rememberMe: new fromAngularForms.FormControl('')
    });

    @Input() resource;
    @Input() auth;
    @Input()
    set loading(isLoading: boolean) {
        if (isLoading) {
            this.loginForm.disable();
        } else {
            this.loginForm.enable();
        }
    }
    @Output() submitted = new EventEmitter<Auth>();

    ngOnInit() { }

    submit() {
        this.submitted.emit(this.loginForm.value);
    }
}
