import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';

import { environment } from '~env/environment';
import { CommonModule } from '~common/common.module';
import { ClientRoutingModule } from './client-routing.module';
import { ClientService } from './client.service';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { SessionService } from './session.service';
import { SessionExpiredComponent } from './session-expired/session-expired.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterComponent } from './register/register.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';


@NgModule({
  imports: [
    NgCommonModule,
    CommonModule,
    ClientRoutingModule
  ],
  exports: [
    MenuComponent
  ],
  declarations: [
    MenuComponent,
    LoginComponent,
    SessionExpiredComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    RegisterComponent,
    TermsOfUseComponent
  ],
  providers: [
    ClientService,
    SessionService
  ]
})
export class ClientModule {
  constructor(
    private clientService: ClientService
  ) {
    clientService.checkAuthentication();
  }
}
