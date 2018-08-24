/**
 * Modify Utils
 */
import * as _ from 'lodash';

export class UIUtils {
    isNullOrUndefined(value: any): boolean {
        return _.isNil(value) || value === '';
    }

    isEmpty(value: any): boolean {
        return _.isEmpty(value) || value === '';
    }

    isNumber(a: any): boolean {
        if (a === null || a.length === 0) {
            return false;
        } else {
            return (!isNaN(a));
        }
    }
}