import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { InventoryComponent } from './inventory/inventory.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { RouteGuardService } from './route-guard.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserdetailComponent } from './userdetail/userdetail.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignUpComponent},
  {path: "updateuser/:id", component: UpdateUserComponent, canActivate: [RouteGuardService]},
  {path: "inventory", component: InventoryComponent, canActivate: [RouteGuardService]},
  // {path:"manageuser", component: ManageUserComponent, canActivate: [RouteGuardService]},
  {path: "logout", component: LogoutComponent, canActivate: [RouteGuardService]},
  {path: "userdetails", component: UserdetailComponent, canActivate: [RouteGuardService]},
  {path: "**", component: ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
