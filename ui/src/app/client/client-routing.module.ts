import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SessionExpiredComponent } from './session-expired/session-expired.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';

const routes: Routes = [
  { path: 'client-login', component: LoginComponent, outlet: 'modal' },
  { path: 'forgot-password', component: ForgotPasswordComponent, outlet: 'modal' },
  { path: 'session-expired', component: SessionExpiredComponent, outlet: 'modal' },
  { path: 'register', component: RegisterComponent, outlet: 'modal' },
  { path: 'reset-password/:id', component: ResetPasswordComponent },
  { path: 'terms-of-use', component: TermsOfUseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
