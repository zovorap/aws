import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { NavigationService } from 'app/navigation.service';
import { ClientService } from 'app/client/client.service';
import { SessionService } from 'app/client/session.service';
import { ToastrService } from '~common/toastr/toastr.service';
import { passwordMatchValidator } from '~utils';

@Component({
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResetPasswordComponent implements OnInit {
  public form: FormGroup;
  public apiErrorMessage: string;

  public password = {
    control: new FormControl('', [Validators.required, Validators.minLength(8)]),
    value: '',
    type: 'password',
    label: 'New Password<small>*</small>',
    validationMessages: {
      required: 'Password cannot be blank.',
      minlength: 'Password should contain at least 8 characters.'
    }
  };

  public confirmPassword = {
    control: new FormControl('', [Validators.required, passwordMatchValidator]),
    value: '',
    type: 'password',
    label: 'Confirm New Password<small>*</small>',
    validationMessages: {
      required: 'Confirm Password cannot be blank.',
      passwordmatch: 'Passwords don\'t match'
    }
  };

  public clientId = {
    control: new FormControl(this.clientId.value),
    value: '',
    type: 'hidden'
  };

  constructor(
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private clientService: ClientService,
    private sessionService: SessionService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.clientId.value = this.route.snapshot.paramMap.get('id');
    this.createForm();
  }

  public submit() {
    if (this.form.valid) {
      this.clientService.resetPassword(this.form)
        .subscribe(this.onResetPasswordSuccess.bind(this));
    }
  }

  private onResetPasswordSuccess(response) {
    if (!!response.errorMessage) {
      this.onResetPasswordError(response);
    } else {
      this.sessionService.startSession(response);
      this.navigationService.goHome();

      this.toastrService.pop({
        lifeTime: 5000,
        type: 'success',
        title: 'Password reset',
        message: 'Your password has been changed successfully!'
      });
    }
  }

  private onResetPasswordError(response) {
    if (!!response.errorMessage) {
      this.apiErrorMessage = response.errorMessage;
    }
  }

  private createForm() {
    this.form = new FormGroup({
      password: this.password.control,
      confirmPassword: this.confirmPassword.control,
      clientId: this.clientId.control
    });

    this.password.control.valueChanges.subscribe((value) => {
      this.confirmPassword.control.updateValueAndValidity();
    });
  }
}
