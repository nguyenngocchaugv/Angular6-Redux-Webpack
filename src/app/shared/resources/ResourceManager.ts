import DefaultResources from './languages/en';
import { UIUtils } from '../../utils/UIUtils';
import { StringUtils } from '../../utils/StringUtils';

const uiUtils = new UIUtils();
const stringUtils = new StringUtils();

let ResourceManager = {
    curResource: require('./languages/en').default,
    format: (key, keys) => {
        var str = this.getString(key);

        if (Array.isArray(keys)) {
            let params = [];
            for (var i = 0; i < keys.length; i++) {
                let param = this.getString(keys[i]);
                if (param === null) {
                    param = keys[i];
                }

                params.push(param);
            }
            str = stringUtils.formatString(str, params);
        } else {
            let param = this.getString(keys);
            if (param === null) {
                param = keys;
            }

            str = stringUtils.formatString(str, param);
        }
        return str;
    },
    getResource: () => {
        return DefaultResources;
    },
    getString: (key, param = null, option = null) => {
        let Resources = this.default.curResource;

        if (typeof Resources !== "undefined") {
            let str = Resources[key];
            if (str === null || str.length === 0) {
                return stringUtils.textTranfrom(option, str);
            }

            if (param === null) {
                return stringUtils.textTranfrom(option, str);
            } else {
                if (typeof param === 'string' || uiUtils.isNumber(param)) {
                    let paramValue = Resources[param];
                    if (paramValue === undefined || paramValue === null) {
                        paramValue = param;
                    }

                    str = this.format(key, paramValue, option);
                } else {
                    if (Array.isArray(param) && param.length > 0) {
                        str = this.format(key, param, option);
                    }
                }
                if (str === '') {
                    console.log("<ERR! Resource could not be found!>");
                }

                return stringUtils.textTranfrom(option, str);
            }
        } else {
            return "";
        }
    },
};

export default ResourceManager;
