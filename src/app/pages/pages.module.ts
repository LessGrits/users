import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from "@angular/router";
import {NotFoundPageComponent} from "./routing/not-found-page/not-found-page.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ErrorInterceptor} from "../interceptors/error.interceptor";
import {ForbiddenPageComponent} from "./routing/forbidden-page/forbidden-page.component";

const routes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./routing/users/users.module').then(
        (module) => module.UsersModule
      ),
  },
  {path: '404', component: NotFoundPageComponent},
  {path: '403', component: ForbiddenPageComponent},
  {path: '**', redirectTo: '/404'},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
})
export class PagesModule {
}
