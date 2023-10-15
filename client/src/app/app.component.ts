import { Component } from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {authConfig} from "./auth/auth-config";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {}
