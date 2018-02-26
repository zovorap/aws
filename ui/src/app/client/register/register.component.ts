import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NavigationService } from 'app/navigation.service';
import { ClientService } from 'app/client/client.service';
import { passwordMatchValidator, phoneValidator } from '~utils';
import { IError, IClient } from '~schema';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
  public form: FormGroup;
  public apiErrorMessage: string;

  public email = {
    control: new FormControl('', [Validators.required, Validators.email]),
    value: '',
    label: 'Email<small>*</small>',
    validationMessages: {
      required: 'Please provide an email. This will be your user log in.',
      email: 'The email address provided is not valid.'
    }
  };

  public firstName = {
    control: new FormControl('', Validators.required),
    value: '',
    label: 'First Name<small>*</small>',
    validationMessages: {
      required: 'Don\'t forget your name.'
    }
  };

  public lastName = {
    control: new FormControl('', Validators.required),
    value: '',
    label: 'Last Name<small>*</small>',
    validationMessages: {
      required: 'Don\'t forget your name.'
    }
  };

  public password = {
    control: new FormControl('', [Validators.required, Validators.minLength(8)]),
    value: '',
    type: 'password',
    label: 'Password<small>*</small>',
    validationMessages: {
      required: 'Type your password.',
      minlength: 'Password should contain at least 8 characters.'
    }
  };

  public confirmPassword = {
    control: new FormControl('', [Validators.required, passwordMatchValidator]),
    value: '',
    type: 'password',
    label: 'Confirm Password<small>*</small>',
    validationMessages: {
      required: 'Retype your password.',
      passwordmatch: 'Passwords don\'t match'
    }
  };

  public phone = {
    control: new FormControl('', phoneValidator),
    value: '',
    type: 'tel',
    label: 'Phone',
    guidanceText: 'i.e. 1 (234) 567 8901, 1 234 567 8901 x123 etc',
    validationMessages: {
      phone: 'Phone format is not correct'
    }
  };

  public acceptTermsOfUse = {
    control: new FormControl(false, [Validators.requiredTrue]),
    value: false,
    type: 'checkbox',
    label: 'Accept <a href="terms-of-use" target="_blank">Terms of Use</a>',
    validationMessages: {
      required: 'You have to accept Terms of Use'
    }
  };

  public additionalInfo = {
    control: new FormControl(''),
    value: '',
    type: 'textarea',
    label: 'Tell me how I can help',
    guidanceText: 'What are you looking for?'
  };

  constructor(
    private navigationService: NavigationService,
    private clientService: ClientService
  ) {
    this.createForm();
  }

  public register() {
    if (this.form.valid) {
      this.clientService.login(this.form)
        .subscribe(this.onRegisterSuccess.bind(this), this.onRegisterError.bind(this));
    }
  }

  public openLoginModal() {
    this.clientService.showLoginModal();
  }

  private createForm(): void {
    this.form = new FormGroup({
      email: this.email.control,
      firstName: this.firstName.control,
      lastName: this.lastName.control,
      password: this.password.control,
      confirmPassword: this.confirmPassword.control,
      phone: this.phone.control,
      additionalInfo: this.additionalInfo.control,
      acceptTermsOfUse: this.acceptTermsOfUse.control
    });

    this.password.control.valueChanges.subscribe(() => {
      this.confirmPassword.control.updateValueAndValidity();
    });
  }

  private onRegisterSuccess(response: IClient & IError): void {
    if (!!response.errorMessage) {
      this.onRegisterError(response);
    } else {
      const message = `You've successfully registered on the website and logged in.
      <br><br>
      You can close this window now.`;

      this.clientService.showThankYouModal(message);
    }
  }

  private onRegisterError(response: IError): void {
    this.apiErrorMessage = response.errorMessage;
  }
}
