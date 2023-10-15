import {Injectable, Injector} from "@angular/core";
import {AuthConfig, JwksValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {filter} from "rxjs";
import {Router} from "@angular/router";
import {LAZY_PATH} from "../app-routing.module";
import {LoginResponse, OidcSecurityService} from "angular-auth-oidc-client";
import {authConfig} from "./auth-config";

@Injectable({
    providedIn: 'root'
})
export class InitialAuthService {

    private _decodedAccessToken: any;
    private _decodedIDToken: any;
    get decodedAccessToken() { return this._decodedAccessToken; }
    get decodedIDToken() { return this._decodedIDToken; }

    constructor(
        private oauthService: OAuthService,
        private authConfig: AuthConfig,
        private injector: Injector,
        private router: Router,
        //public oidcSecurityService: OidcSecurityService

    ) {



    }

    async initAuth(): Promise<any> {

/*
        this.oidcSecurityService.checkAuth().subscribe((loginResponse: LoginResponse) => {
                const { isAuthenticated, userData, accessToken, idToken, configId } =
                    loginResponse;

                console.log(userData)
                console.log(idToken)



                console.log("IS AUTHENTICATED")
                console.log(isAuthenticated)

                if(!isAuthenticated) {
                    this.oidcSecurityService.authorize();

                }

            }
        );
*/

        console.log("Init")

        this.oauthService.configure(authConfig);
        //this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        this.oauthService.loadDiscoveryDocumentAndLogin()



        /*return new Promise<void>((resolveFn, rejectFn) => {
            // setup oauthService
            this.oauthService.configure(this.authConfig);
            this.oauthService.setStorage(localStorage);
            //this.oauthService.tokenValidationHandler = new JwksValidationHandler();

            // subscribe to token events
            this.oauthService.events
                .pipe(filter((e: any) => e.type === 'token_received'))
                .subscribe(() => this.handleNewToken());


            // continue initializing app (provoking a token_received event) or redirect to login-page
            this.oauthService.loadDiscoveryDocumentAndTryLogin().then(isLoggedIn => {

                console.log("ID TOEKN")
                console.log(this.oauthService.getIdToken())
                console.log(window.location);
                let result = window.location.href.includes("id_token");

                if (result) {
                    console.log("Login successful")
                    this.oauthService.setupAutomaticSilentRefresh();
                     this.injector.get(Router).navigateByUrl( '/home') // remove login hash fragments from url
                       .then(() => resolveFn());
                    // if you don't use clearHashAfterLogin from angular-oauth2-oidc you can remove the #hash or route to some other URL manually:
                    // const lazyPath = this.injector.get(LAZY_PATH) as string;
                    // this.injector.get(Router).navigateByUrl(lazyPath + '/a') // remove login hash fragments from url
                    //   .then(() => resolveFn()); // callback only once login state is resolved
                } else {
                    console.log("Implicit again")

                    this.oauthService.initImplicitFlow();
                    rejectFn();
                }
            });
        });*/
    }


    /*private handleNewToken() {
        console.log("IdTOKEN")
        console.log(this.oauthService.getIdToken())

        //this.oauthService.getIdToken()
        this._decodedIDToken = ""//this.jwtHelper.decodeToken(this.oauthService.getIdToken());
    }*/



}



