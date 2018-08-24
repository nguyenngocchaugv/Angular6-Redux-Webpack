import {Injectable} from "@angular/core";
import {HTTP_VERBS} from "../shared/constants/HttpRequest";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import * as _ from "lodash";
import {ApiHelpers} from "../utils/ApiHelpers";
import {GlobalApp} from "../utils/GlobalApps";

@Injectable()
export class BaseService {

    private httpVerbs = HTTP_VERBS;
    private baseUrl: string;

    constructor(private http: HttpClient, private global: GlobalApp, private apiHelper: ApiHelpers) {
        this.baseUrl = "http://localhost:5000";
    }

    get<T>(url: string, options: any = {}) {
        let method = this.httpVerbs.GET;
        let reqOptions = this.getOptions();
        url = this.apiHelper.buildQueryString(url, options);
        return this.async<T>(method, url, null, reqOptions);
    }

    post<T>(url: any, options: any = {}) {
        let method = this.httpVerbs.POST,
            reqOptions,
            body = {};
        body["data"] = options.data;
        body["items"] = options.items;
        body["meta"] = {
            "type": options.meta
        };
        options.body = _.cloneDeep(body);
        try {
            body = JSON.stringify(body, (key, value) => {
                if (value === undefined) {
                    return null;
                }
                return value;
            });
        } catch (err) {
            body = null;
        }

        reqOptions = this.getOptions();
        url = this.getUrl(url, options);
        return this.async<T>(method, url, body, reqOptions);
    }


    /**
     * set header to request options
     **/
    getOptions() {
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return headers;
    }

    put<T>(url: any, options: any) {
        let method = this.httpVerbs.PUT,
            reqOptions,
            body = {};

        body["data"] = options.data;


        try {
            body = JSON.stringify(body, (key, value) => {
                if (value === undefined) {
                    return null;
                }
                return value;
            });
        } catch (err) {
            body = null;
        }

        reqOptions = this.getOptions();
        url = this.getUrl(url, options);

        return this.async<T>(method, url, body, reqOptions);
    }

    delete<T>(url: any, options: any) {
        let method = this.httpVerbs.DELETE,
            reqOptions,
            body;

        body = {
            meta: {}
        };

        reqOptions = this.getOptions();

        try {
            reqOptions["body"] = JSON.stringify(body, (key, value) => {
                if (value === undefined) {
                    return null;
                }
                return value;
            });
        } catch (err) {
            reqOptions["body"] = null;
        }
        url = this.getUrl(url, options);

        return this.async<T>(method, url, null, reqOptions);
    }

    getUrl(url: any, options: any) {
        if (options && options.baseUrl) {
            return options.baseUrl + url;
        }
        return this.baseUrl + url;
    }

    async<T>(method: any, url: any, body: any, reqOptions: any) {
        return new Promise((resolve, reject) => {
            this.http[_.lowerCase(method)](
                url,
                (method === HTTP_VERBS.POST) || (method === HTTP_VERBS.PUT) ? body : reqOptions,
                (method === HTTP_VERBS.POST) || (method === HTTP_VERBS.PUT) ? reqOptions : null
            ).subscribe(
                (res: any) => {
                    let data;

                    try {
                        data = JSON.parse(res._body);
                        resolve(data);
                    } catch (err) {
                        resolve(res);
                    }
                }, (err: HttpErrorResponse) => {
                    if (err.error instanceof ErrorEvent) {
                        console.log(err.error.message);
                    } else {
                        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                    }
                });
        });
    }
}
