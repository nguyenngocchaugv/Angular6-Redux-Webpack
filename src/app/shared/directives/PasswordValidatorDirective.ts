import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, ValidationErrors } from '@angular/forms';

import RS from '../../shared/resources/ResourceManager';
import { CustomValidators } from '../../utils/Validators';
import { UIUtils } from '../../utils/UIUtils';

@Directive({
    selector: '[passWordPattern]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: PassWordPatternValidatorDirective,
            multi: true
        }
    ]
})

export class PassWordPatternValidatorDirective implements Validator {
    validate(ctrl: FormControl): ValidationErrors {
        const currentValue = ctrl.value;
        let stringUtil = new UIUtils();
        let uiUtil = new CustomValidators();

        if (stringUtil.isNullOrUndefined(currentValue)) {
            return null;
        } else if (!uiUtil.isValidInputPattern(currentValue)) {
            return null;
        } else {
            const isValid = uiUtil.isValidPassword(currentValue);

            const message = {
                password: {
                    message: RS.getString('MSG_ERROR_PATTERN_PASSWORD')
                }
            };

            return isValid ? null : message;
        }
    }
}