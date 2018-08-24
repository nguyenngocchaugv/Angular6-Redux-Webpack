import { UIUtils } from './UIUtils';

export class CustomValidators {
    isValidPassword(password: string): boolean {
        var validated;
        var isInvalidPass = /(?=.*?[~`\\,.<>?/\|"';-=+.-])/.test(password);
        var isHasNumber = /(?=.*?[0-9])/.test(password);
        var isHasLowerCase = /(?=.*?[a-z])/.test(password);
        var isHasUpperCase = /(?=.*?[A-Z])/.test(password);
        var isHasSpecialCharacter = /(?=.*?[!@#$%^&*(){}[\]_])/.test(password);

        if (isInvalidPass === false) {
            if (isHasNumber === true && isHasLowerCase === true && isHasUpperCase === true) {
                return validated = true;
            }
            if (isHasNumber === true && isHasLowerCase === true && isHasSpecialCharacter === true) {
                return validated = true;
            }
            if (isHasNumber === true && isHasUpperCase === true && isHasSpecialCharacter === true) {
                return validated = true;
            }
            if (isHasLowerCase === true && isHasUpperCase === true && isHasSpecialCharacter === true) {
                return validated = true;
            }
        }
    }

    isEmail(email: string): boolean {
        var re = /^[A-Za-z]+[A-Za-z0-9-_]+(\.[A-Za-z0-9-_]+)*@[A-Za-z0-9]+[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/i;
        return re.test(email);
    }

    isValidInputPattern(input: string): boolean {
        var re = /^[^<>=\[\]]+$/i;
        return re.test(input);
    }
}