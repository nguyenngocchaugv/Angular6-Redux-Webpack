import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

import RS from '../shared/resources/ResourceManager';

@Component({
    selector: 'show-errors',
    template: `
        <ul *ngIf="showErrors()" class="ul-invalid">
            <li class="invalid-feedback" *ngFor="let error of errors()">{{error}}</li>
        </ul>
    `
})
export class ShowErrorsComponent {
    private static readonly errorMessage = {
        required: () => RS.getString('MSG_ERROR_REQUIRED'),
        minLength: (params) => RS.getString('MSG_ERROR_MIN_LENGTH', params.requiredLength),
        maxLength: (params) => RS.getString('MSG_ERROR_MAX_LENGTH', params.requiredLength),
        pattern: (params) => RS.getString('MSG_ERROR_PATTERN_NOT_ALLOW', params.requiredPattern),
        password: (params) => params.message,
        inputPattern: (params) => params.message
    };

    @Input()
    private control: AbstractControlDirective | AbstractControl;

    public showErrors(): boolean {
        return this.control &&
            this.control.errors && (this.control.dirty || this.control.touched);
    }

    public errors(): string[] {
        return Object.keys(this.control.errors)
            .map(filed => this.getMessage(filed, this.control.errors[filed]));
    }

    private getMessage(type: string, params: any) {
        return ShowErrorsComponent.errorMessage[type](params);
    }
}