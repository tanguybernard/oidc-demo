import {Component, OnInit} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {authConfig} from "./auth/auth-config";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {


  constructor(private oauthService:OAuthService) {
  }

  ngOnInit(): void {



    this.oauthService.configure(authConfig);
    //this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndLogin()




  }



}
