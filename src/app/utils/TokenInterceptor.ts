import {
    HttpHandler, HttpInterceptor, HttpRequest,
    HttpEvent, HttpResponse, HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { GlobalApp } from "./GlobalApps";
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private globalApp: GlobalApp,
                private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(JSON.stringify(req));
        const started = Date.now();
        let token = "12321321321321"; // example token , use service to authen and createToken when call api

        req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });

        if (!req.headers.has('Content-Type')) {
            req = req.clone({
                headers: req.headers.set('Content-Type', 'application/json')
            });
        }
        req = req.clone({
            headers: req.headers.set('Accept', 'application/json')
        });
        return next.handle(req)
            .pipe(tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    const elapsed = Date.now() - started;
                    console.log("Date :", new Date().toDateString());
                    console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
                }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 404) {
                        //navigate the user to login route
                        this.router.navigateByUrl('/login');
                        //remove the token from the localStorage
                    }
                }
            }));
    }


}
