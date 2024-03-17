import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {UsersPageComponent} from "./routing/users-page/users-page.component";
import {UserPageComponent} from "./routing/user-page/user-page.component";
import {ButtonUiComponent} from "../../../components/button-ui/button-ui.component";
import {UsersHttpService} from "../../../services/users-http.service";
import {UsersFacadeService} from "../../../services/users-facade.service";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {FormValidationDirective} from "../../../directives/form-validation.directive";
import {TableUiComponent} from "../../../components/table-ui/table-ui.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users'
  },
  {
    path: 'users',
    component: UsersPageComponent,
    children: [
      {
        path: ':id',
        component: UserPageComponent
      }
    ]
  },
];


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ButtonUiComponent,
    FormValidationDirective,
    TableUiComponent
  ],
  declarations: [UserPageComponent, UsersPageComponent],
  providers: [UsersHttpService, UsersFacadeService]
})
export class UsersModule {
}
