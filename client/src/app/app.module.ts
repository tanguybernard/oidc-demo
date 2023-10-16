import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {AuthModule} from "./auth/auth.module";
import {HomeComponent} from "./home/home.component";
import {NewsComponent} from "./news/news.component";

@NgModule({
  declarations: [
    AppComponent,
      HomeComponent,
      NewsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  providers: [
    /*{
      provide: HTTP_INTERCEPTORS, useClass: ExampleInterceptor, multi:true
    },*/
  ]
})
export class AppModule { }
