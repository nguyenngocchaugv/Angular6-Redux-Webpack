

export class ApiHelpers {

    constructor() {

    }


    buildQueryString(url: any, options: any) {
        if (options && options.query) {
            for (let key in options.query) {
                if (options.query[key]) {
                    url = this.updateQueryStringParameter(url, key, options.query[key]);
                }
            }
        }
        return url;
    }


    updateQueryStringParameter(url: any, key: any, value: any) {
        let regex = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        let separator = url.indexOf("?") !== -1 ? "&" : "?";
        if (url.match(regex)) {
            return url.replace(regex, "$1" + key + "=" + value + "$2");
        } else {
            return url + separator + key + "=" + value;
        }
    }

}
