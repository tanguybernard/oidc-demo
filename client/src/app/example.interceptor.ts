import {Injectable, Optional} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {OAuthModuleConfig, OAuthStorage} from "angular-oauth2-oidc";

@Injectable()
export class ExampleInterceptor implements HttpInterceptor {

  constructor(
      private authStorage: OAuthStorage,
      @Optional() private moduleConfig: OAuthModuleConfig) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let url = req.url.toLowerCase();

    console.log(req)

    if (!this.moduleConfig) return next.handle(req);
    if (!this.moduleConfig.resourceServer) return next.handle(req);
    if (!this.moduleConfig.resourceServer.allowedUrls) return next.handle(req);
    //if (!this.checkUrl(url)) return next.handle(req);

    let sendAccessToken = this.moduleConfig.resourceServer.sendAccessToken;

    if (sendAccessToken) {

      console.log('Sending access token Interceptor')

      let token = this.authStorage.getItem('access_token');
      let header = 'Bearer ' + token;

      let headers = req.headers
          .set('Authorization', header);

      req = req.clone({ headers });
    }


    return next.handle(req);
  }
}
