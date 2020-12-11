import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { LoginComponent } from './login/login.component'
import { SignUpComponent } from './sign-up/sign-up.component'
import { UpdateUserComponent } from './update-user/update-user.component'
import { InventoryComponent } from './inventory/inventory.component'
import { ManageUserComponent } from './manage-user/manage-user.component'
import { ErrorComponent } from './error/error.component'
import { LogoutComponent } from './logout/logout.component'
import { NgxPaginationModule } from 'ngx-pagination'
import { FilterPipe } from './pipe/filter.pipe'
import { CommonModule } from '@angular/common'
import { AuthenticateService } from './authenticate.service'
import { HttpIntercepterService } from './http/http-intercepter.service'
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignUpComponent,
    UpdateUserComponent,
    InventoryComponent,
    ManageUserComponent,
    ErrorComponent,
    LogoutComponent,
    FilterPipe,
    InventoryListComponent,
    ItemDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
  ],
  providers: [
    AuthenticateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpIntercepterService,
      multi: true,
    },
  ],
  exports: [FilterPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
