import { UIUtils } from './UIUtils';
import * as CryptoJS from 'crypto-js';
import * as urlencode from 'urlencode';
import { StringUtils } from './StringUtils';

export class GlobalApp {
    private _user: any = null;
    private _sessionStorageAllowed: boolean = true;
    private _secretKey: string = 'qt';
    private _globalInfo: string = null;
    private _uiutils = new UIUtils();
    private _stringUtils = new StringUtils();


    encryptValue(value: string): string {
        if (!this._uiutils.isNullOrUndefined(value)) {
            try {
                return CryptoJS.AES.encrypt(JSON.stringify(value), this._secretKey).toString();
            } catch (err) {
                console.log('encryptValue' , err);
            }
        } else {
            return value;
        }
    }

    decryptValue(value: string): string {
        if (!this._uiutils.isNullOrUndefined(value)) {
            try {
                return CryptoJS.AES.encrypt(JSON.stringify(value), this._secretKey).toString();
            } catch (err) {
                console.log('decryptValue' , err);
            }
        } else {
            return value;
        }
    }

    setCurrentUser(user: any) {
        this._user = this.encryptValue(user);

        if (this._sessionStorageAllowed) {
            try {
                if (!this._uiutils.isNullOrUndefined(user)) {
                    sessionStorage.setItem('authService', this.encryptValue(user));
                } else {
                    sessionStorage.removeItem('authService');
                }
            } catch (err) {
                this._sessionStorageAllowed = false;

                console.log('setCurrentUser' , err);
            }
        }
    }

    getCurrentUser(): any {
        if (this._uiutils.isNullOrUndefined(this._user)) {
            try {
                if (this._sessionStorageAllowed) {
                    let authService = sessionStorage.getItem('authService');

                    if (!this._uiutils.isNullOrUndefined(authService)) {
                        this._user = authService;
                    }
                }
            } catch (err) {
                this._sessionStorageAllowed = false;

                console.log('getCurrentUser' , err);
            }
        }

        return this.decryptValue(this._user);
    }

    setSecretKey(newKey: string): void {
        this._secretKey = newKey;

        if (this._sessionStorageAllowed) {
            try {
                if (!this._uiutils.isNullOrUndefined(newKey)) {
                    sessionStorage.setItem('secretKey', JSON.stringify(newKey));
                } else {
                    sessionStorage.removeItem('secretKey');
                }
            } catch (err) {
                this._sessionStorageAllowed = false;

                console.log('setSecretKey' , err);
            }
        }
    }

    getSecretKey(): string {
        if (this._uiutils.isNullOrUndefined(this._secretKey)) {
            if (this._sessionStorageAllowed) {
                try {
                    let secretKey = sessionStorage.getItem('secretKey');

                    if (!this._uiutils.isNullOrUndefined(secretKey)) {
                        this._secretKey = secretKey;
                    }
                } catch (err) {
                    this._sessionStorageAllowed = false;

                    console.log('getSecretKey' , err);
                }
            }

            return this._secretKey;
        }
    }

    setGlobalInfo(globalInfo: string): void {
        this._globalInfo = this.encryptValue(globalInfo);
        if (this._sessionStorageAllowed === true) {
            try {
                if (!this._uiutils.isNullOrUndefined(globalInfo)) {
                    sessionStorage.setItem('globalInfo', this.encryptValue(globalInfo));
                } else {
                    sessionStorage.removeItem('globalInfo');
                }
            } catch (err) {
                this._sessionStorageAllowed = false;

                console.log('setGlobalInfo' , err);
            }
        }
    }

    getGlobalInfo(): string {
        if (this._uiutils.isNullOrUndefined(this._globalInfo)) {
            if (this._sessionStorageAllowed) {
                try {
                    let globalInfo = sessionStorage.getItem('globalInfo');

                    if (!this._uiutils.isNullOrUndefined(globalInfo)) {
                        this._globalInfo = globalInfo;
                    }
                } catch (err) {
                    this._sessionStorageAllowed = false;

                    console.log('getGlobalInfo' , err);
                }
            }

            return this._globalInfo;
        }
    }

    getPermission(): Array<any> {
        let user = this.getCurrentUser();

        if (!this._uiutils.isNullOrUndefined(user)) {
            return user.permissions;
        } else {
            return [];
        }
    }

    //With login token is email, secret is hashPassword
    getHeader(method: any, path: any, token: any, secret: any, body: any) {
        try {
            body = JSON.stringify(ksort(body));
        } catch (error) {
            body = "{}";
        }
        let nonce = getNonce(),
            timestamp = Math.floor(Date.now() / 1000),
            signature = generateSignature();

        return {
            Signature: signature,
            Timestamp: timestamp,
            Nonce: nonce
        };

        function getNonce() {
            //Random string with 18 character
            let strRandom = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 18);

            //Get date with format YYYYMMDDHHMMSS
            let date = new Date();
            let dateString = date.toISOString().split('.')[0].replace(/[-T:]/g, '');

            //Return nonce = string + date
            return strRandom + dateString;
        }

        // Create a signature by Method (PUT) & URL Path & Timestamp & Nonce & Body
        function generateSignature() {
            let arrayPath = path.split('?');
            let baseString = this._stringUtils.formatString('{0}&{1}&{2}&{3}&{4}', urlencode.encode(method), urlencode.encode(arrayPath[0]), urlencode.encode(timestamp), urlencode.encode(nonce), urlencode.encode(body));
            let key = token + "&" + secret;
            let sign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(baseString, key));

            return sign;
        }

        function ksort(obj: any) {
            var keys = Object.keys(obj).sort(),
                sortedObj = {};

            for (var i in keys) {
                if (keys.hasOwnProperty(i) && obj[keys[i]] !== null) {
                    if (Object.prototype.toString.call(obj[keys[i]]) === '[object Date]') {
                        obj[keys[i]] = obj[keys[i]].toISOString();
                    } else if (Object.prototype.toString.call(obj[keys[i]]) === "[object Array]" || typeof obj[keys[i]] === "object") {
                        obj[keys[i]] = ksort(obj[keys[i]]);
                    }

                    sortedObj[keys[i]] = obj[keys[i]];
                }
            }
            return sortedObj;
        }
    }
}
