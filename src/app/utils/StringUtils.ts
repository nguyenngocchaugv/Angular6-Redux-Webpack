import * as _ from 'lodash';

export const Option = {
    UPPER: 'UPPER',
    LOWER: 'LOWER',
    FIRSTCAP: 'FIRSTCAP',
    CAPEACHWORD: 'CAPEACHWORD'
};

export class StringUtils {
    formatString(msg: string, ...characters: any[]): string {
        for (let i = 0; i < characters.length; i++) {
            let regexp = new RegExp('\\{' + i + '\\}', 'gi');
            msg = msg.replace(regexp, characters[i]);
        }

        return msg;
    }

    firstCapitalizeLetter(string: string): string {
        var pieces = string.toLowerCase().split(" ");
        pieces[0] = pieces[0].charAt(0).toUpperCase() + pieces[0].slice(1);
        return pieces.join(" ");
    }

    capitalizeFirstLetter(string: string): string {
        var pieces = string.split(" ");
        for (var i = 0; i < pieces.length; i++) {
            pieces[i] = pieces[i].charAt(0).toUpperCase() + pieces[i].slice(1);
        }
        return pieces.join(" ");
    }

    textTranfrom(option: any, str: any): string {
        switch (option) {
            case Option.UPPER:
                return str.toUpperCase();
            case Option.LOWER:
                return str.toLowerCase();
            case Option.FIRSTCAP:
                return this.firstCapitalizeLetter(str);
            case Option.CAPEACHWORD:
                return this.capitalizeFirstLetter(str);
            default:
                return str;
        }
    }
}