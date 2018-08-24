import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, ValidationErrors } from '@angular/forms';

import { CustomValidators } from '../../utils/Validators';
import { UIUtils } from '../../utils/UIUtils';

@Directive({
    selector: '[inputPattern]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: InputPatternValidatorDirective,
            multi: true
        }
    ]
})

export class InputPatternValidatorDirective implements Validator {
    validate(ctrl: FormControl): ValidationErrors {
        const currentValue = ctrl.value;
        let stringUtil = new UIUtils();

        if (stringUtil.isNullOrUndefined(currentValue)) {
            return null;
        } else {
            let util = new CustomValidators();
            const isValid = util.isValidInputPattern(currentValue);

            const message = {
                inputPattern: {
                    message: 'Operators such as [; ]; <; >; = are not allowed'
                }
            };

            return isValid ? null : message;
        }
    }
}
