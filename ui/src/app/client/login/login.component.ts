import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NavigationService } from 'app/navigation.service';
import { ClientService } from 'app/client/client.service';
import { ModalService } from '~common/modal/modal.service';
import { IError, IClient } from '~schema';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  public form: FormGroup;
  public apiErrorMessage: string;

  public email = {
    control: new FormControl('', [ Validators.required, Validators.email ]),
    value: '',
    label: 'Email<small>*</small>',
    validationMessages: {
      required: 'Login with an email.'
    }
  };

  public password = {
    control: new FormControl('', Validators.required),
    value: '',
    type: 'password',
    label: 'Password<small>*</small>',
    validationMessages: {
      required: 'Type your password.'
    }
  };

  public rememberMe = {
    control: new FormControl(false),
    value: false,
    type: 'checkbox',
    label: 'Remember me'
  };

  constructor(
    private navigationService: NavigationService,
    private clientService: ClientService,
    private modalService: ModalService
  ) {
    this.createForm();
  }

  public login(): void {
    if (this.form.valid) {
      this.clientService.login(this.form)
        .subscribe(this.onLoginSuccess.bind(this), this.onLoginError.bind(this));
    }
  }

  public openForgotPasswordModal(): void {
    this.modalService.show({
      title: 'Forgot Password?',
      hasControls: false,
      url: 'forgot-password'
    });
  }

  public openRegisterModal(): void {
    this.clientService.showRegisterModal();
  }

  private onLoginSuccess(response: IClient & IError): void {
    if (!!response.errorMessage) {
      this.onLoginError(response);
    } else {
      const message = `You are successfully logged in`;

      this.clientService.showThankYouModal(message);
      setTimeout(() => this.modalService.hide(), 1500);
    }
  }

  private onLoginError(response: IError): void {
    this.apiErrorMessage = response.errorMessage;
  }

  private createForm(): void {
    this.form = new FormGroup({
      email: this.email.control,
      password: this.password.control,
      rememberMe: this.rememberMe.control
    });
  }
}
