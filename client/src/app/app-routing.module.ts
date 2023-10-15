import {InjectionToken, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";

const lazyPathValue = 'home';
export const LAZY_PATH = new InjectionToken('LAZY_PATH');

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: lazyPathValue
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: lazyPathValue,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [{ provide: LAZY_PATH, useValue: lazyPathValue }],
  exports: [RouterModule]
})
export class AppRoutingModule { }
