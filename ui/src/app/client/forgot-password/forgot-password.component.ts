import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { ClientService } from 'app/client/client.service';
import { ToastrService } from '~common/toastr/toastr.service';
import { ModalService } from '~common/modal/modal.service';

@Component({
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent {
  public form: FormGroup;
  public apiErrorMessage: string;

  public email = {
    control: new FormControl('', [ Validators.required, Validators.email ]),
    value: '',
    label: 'Email<small>*</small>',
    validationMessages: {
      required: 'Email cannot be blank.'
    }
  };

  constructor(
    private toastrService: ToastrService,
    private modalService: ModalService,
    private clientService: ClientService,
  ) {
    this.createForm();
  }

  public submit() {
    if (this.form.valid) {
      this.clientService.requestPasswordReset(this.form)
        .subscribe(this.onSubmitSuccess.bind(this));
    }
  }

  private onSubmitSuccess(response) {
    this.modalService.show({
      title: 'Thank you!',
      hasControls: false,
      tpl: `
        <p>
          We have sent to you an email to reset your password
        </p>
      `
    });
  }

  private createForm() {
    this.form = new FormGroup({
      email: this.email.control
    });
  }
}
