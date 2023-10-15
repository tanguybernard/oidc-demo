import { Injectable, Optional } from '@angular/core';
import {OAuthModuleConfig, OAuthService, OAuthStorage} from 'angular-oauth2-oidc';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authStorage: OAuthStorage,
        @Optional() private moduleConfig: OAuthModuleConfig
    ) {
    }


    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let url = req.url.toLowerCase();

        if (!this.moduleConfig) return next.handle(req);
        if (!this.moduleConfig.resourceServer) return next.handle(req);
        if (!this.moduleConfig.resourceServer.allowedUrls) return next.handle(req);

        let sendAccessToken = this.moduleConfig.resourceServer.sendAccessToken;

        if (sendAccessToken) {


            let token = this.authStorage.getItem('id_token');
            console.log(token)
            localStorage.setItem("sendAccessToken","token");

            let header = 'Bearer ' + token;

            let headers = req.headers
                .set('Authorization', header);

            req = req.clone({ headers });
        }

        return next.handle(req);

    }

}
