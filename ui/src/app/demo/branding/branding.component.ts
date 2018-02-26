import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { ModalService } from '~common/modal/modal.service';
import { ToastrService } from '~common/toastr/toastr.service';

@Component({
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BrandingComponent {
  public demoForm: FormGroup;

  public foo = {
    control: new FormControl('', Validators.required),
    value: '',
    label: 'Text Input',
    guidanceText: 'Please enter some text',
    validationMessages: {
      required: 'You can not leave this field empty'
    }
  };

  public bar = {
    control: new FormControl(''),
    value: '',
    type: 'tel',
    label: 'Number'
  };

  public baz = {
    control: new FormControl('', Validators.required),
    value: '',
    type: 'password',
    label: 'Password',
    validationMessages: {
      required: 'Password is required'
    }
  };

  public lorem = {
    control: new FormControl(true),
    value: true,
    type: 'checkbox',
    label: 'Lorem ipsum'
  };

  public isDemoFormSubmitted = false;

  public code = {
    demoForm: `
    script:
    import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

    this.demoForm = new FormGroup({
      foo: this.foo.control,
      bar: this.bar.control,
      baz: this.baz.control,
      lorem: this.lorem.control
    });

    template:
    <lk-form
      id="demoForm"
      [formGroup]="demoForm"
      (submit)="submitDemoForm()"
    >
      <lk-input
        [field]="demoForm.get('foo')"
        autofocus
      ></lk-input>

      <lk-input [field]="demoForm.get('bar')"></lk-input>

      <lk-input [field]="demoForm.get('baz')"></lk-input>

      <lk-input [field]="demoForm.get('lorem')"></lk-input>

      <lk-submit></lk-submit>
    </lk-form>
    `,

    infoToaster: `
    this.toastrService.pop({
      lifeTime: 3000,
      type: 'info',
      title: 'Info Toaster',
      message: \`
        lorem ipsum dolor sit amet
      \`
    });`,

    successToaster: `
    this.toastrService.pop({
      lifeTime: 5000,
      type: 'success',
      title: 'Success Toaster',
      message: \`
        lorem ipsum dolor sit amet
      \`
    });`,

    warningToaster: `
    this.toastrService.pop({
      lifeTime: 7000,
      type: 'warning',
      title: 'Warning Toaster',
      message: \`
        lorem ipsum dolor sit amet
      \`
    });`,

    errorToaster: `
    this.toastrService.pop({
      lifeTime: 10000,
      type: 'error',
      title: 'Error Toaster',
      message: \`
        lorem ipsum dolor sit amet
      \`
    });`,

    simpleModal: `
    this.modalService.show({
      title: 'Simple Modal',
      confirmButton: null,
      cancelButton: '---Close---',
      size: 'sm',
      tpl: \`
        <p>
          Lorem Ipsum Dolor sit amet!
        </p>
      \`
    });`,

    navModal: `
    this.modalService.show({
      url: 'demo-modal',
      hasControls: false,
      title: 'Routing Modal',
      onConfirm: () => alert('The modal response has been confirmed'),
      onCancel: () => alert('The modal response has been ignored')
    });`
  };

  constructor(
    private modalService: ModalService,
    private toastrService: ToastrService
  ) {
    this.createDemoForm();
  }

  public openModal() {
    this.modalService.show({
      title: 'Simple Modal',
      confirmButton: null,
      cancelButton: '---Close---',
      size: 'sm',
      tpl: `
        <p>
          Lorem Ipsum Dolor sit amet!
        </p>
      `
    });
  }

  public openNavModal() {
    this.modalService.show({
      url: 'demo-modal',
      hasControls: false,
      title: 'Routing Modal',
      onConfirm: () => alert('The modal response has been confirmed'),
      onCancel: () => alert('The modal response has been ignored')
    });
  }

  public showInfoToaster() {
    this.toastrService.pop({
      lifeTime: 3000,
      type: 'info',
      title: `Info Toaster`,
      message: `
        lorem ipsum dolor sit amet
      `
    });
  }

  public showSuccessToaster() {
    this.toastrService.pop({
      lifeTime: 5000,
      type: 'success',
      title: `Success Toaster`,
      message: `
        lorem ipsum dolor sit amet
      `
    });
  }

  public showWarningToaster() {
    this.toastrService.pop({
      lifeTime: 7000,
      type: 'warning',
      title: `Warning Toaster`,
      message: `
        lorem ipsum dolor sit amet
      `
    });
  }

  public showErrorToaster() {
    this.toastrService.pop({
      lifeTime: 10000,
      type: 'error',
      title: `Error Toaster`,
      message: `
        lorem ipsum dolor sit amet
      `
    });
  }

  public submitDemoForm() {
    ////////////////////////////////////////////////////////////////
    // console.log(this.demoForm);
    // console.log(this.demoForm.status);
    ////////////////////////////////////////////////////////////////
  }

  private createDemoForm() {
    this.demoForm = new FormGroup({
      foo: this.foo.control,
      bar: this.bar.control,
      baz: this.baz.control,
      lorem: this.lorem.control
    });
  }
}
