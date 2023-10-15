// sometimes you can't use window/document/location in AOT
import {APP_INITIALIZER, NgModule} from "@angular/core";
import {AuthConfig, OAuthModule} from "angular-oauth2-oidc";
import {authConfig} from "./auth-config";
import {InitialAuthService} from "./auth.service";

import { AuthModule as OidcAuthModule, LogLevel } from 'angular-auth-oidc-client';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ExampleInterceptor} from "../example.interceptor";


@NgModule({
    imports: [
        OAuthModule.forRoot()
        /*OidcAuthModule.forRoot({
            config: {
                authority: 'https://localhost:3000',
                redirectUrl: window.location.origin+'/home',
                postLogoutRedirectUri: window.location.origin,
                clientId: 'oidcCLIENT',
                scope: 'openid',
                responseType: 'code',
                silentRenew: true,
                useRefreshToken: true,
                logLevel: LogLevel.Debug,
            },
        }),*/
    ],
    providers: [
        InitialAuthService,
        { provide: AuthConfig, useValue: authConfig

        },
        {
            provide: HTTP_INTERCEPTORS, useClass: ExampleInterceptor, multi:true
        },
        {
            provide: APP_INITIALIZER,
            useFactory: (initialAuthService: InitialAuthService) => () => initialAuthService.initAuth(),
            deps: [InitialAuthService],
            multi: true
        },
    ],
})
export class AuthModule {}
