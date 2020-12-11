import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ErrorComponent } from './error/error.component'
import { InventoryComponent } from './inventory/inventory.component'
import { LoginComponent } from './login/login.component'
import { LogoutComponent } from './logout/logout.component'
import { ManageUserComponent } from './manage-user/manage-user.component'
import { RouteGuardService } from './route-guard.service'
import { SignUpComponent } from './sign-up/sign-up.component'
import { UpdateUserComponent } from './update-user/update-user.component'
import { InventoryListComponent } from './inventory-list/inventory-list.component'
import { ItemDetailsComponent } from './item-details/item-details.component'

const routes: Routes = [
  { path: '', component: LoginComponent },
 // { path: '', component: ItemDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'item-details/:inventoryId',
    component: ItemDetailsComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'updateuser/:id',
    component: UpdateUserComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'inventory',
    component: InventoryListComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'manageuser',
    component: ManageUserComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [RouteGuardService],
  },
  { path: '**', component: ErrorComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
