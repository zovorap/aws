import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgRedux } from '@angular-redux/store';
import { get as _get_, find as _find_, findKey as _findKey_, assign as _assign_ } from 'lodash';

import { IForm, IField, IAppState, IValidationMessages } from '~schema';

@Component({
  selector: 'lk-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputComponent implements OnInit, AfterViewInit {
  @Input() public field: IField;
  @Input() public autofocus: boolean;

  @ViewChild('input') el: ElementRef;

  private defaultValidationMessages = {
    required: 'This field is required.',
    email: 'Not a valid email address.'
  };

  public isFocused = false;
  private parentForm: IForm;

  constructor(
    private store: NgRedux<IAppState>
  ) { }

  ngOnInit() {
    this.fixFieldType();
    this.parentForm = this.findParentForm();
    this.field.validationMessages = _assign_(this.defaultValidationMessages, this.field.validationMessages);
  }

  ngAfterViewInit() {
    if (this.autofocus !== undefined) {
      setTimeout(() => this.el.nativeElement.focus(), 50);
    }
  }

  public get isInvalid(): boolean {
    const isAttempted = !this.parentForm || _get_(this.parentForm, 'submitAttempts') > 0;
    const key = _findKey_(this.field.control.errors, () => true);

    return !this.isFocused && !!key && isAttempted;
  }

  public setFocused(value: boolean) {
    this.isFocused = value;
  }

  public get errorMessage(): string {
    const key = _findKey_(this.field.control.errors, () => true);
    return _get_(this.field.validationMessages, key);
  }

  public get cssClass(): string {
    let cssClass = `is-${this.field.type}`;

    if (this.isFocused) {
      cssClass += ' is-focused';
    }

    if (!this.field.control.value) {
      cssClass += ' is-empty';
    }

    if (this.isInvalid) {
      cssClass += ' is-invalid';
    }

    return cssClass;
  }

  public toggleValue() {
    this.field.control.setValue(!this.field.control.value);
  }

  public get isTextarea() {
    return this.field.type === 'textarea';
  }

  public get isCheckbox() {
    return this.field.type === 'checkbox';
  }

  public get isTypingInput() {
    return this.field.type === 'text' ||
      this.field.type === 'password' ||
      this.field.type === 'tel' ||
      this.field.type === 'number';
  }

  private findParentForm(): IForm {
    const { forms } = this.store.getState();
    return _find_(forms, (form: IForm) => containsField(form.form, this.field.control));

    function containsField(form: FormGroup, field: FormControl): boolean {
      return !!_find_(form.controls, (control: FormControl) => control === field);
    }
  }

  private fixFieldType() {
    this.field.type = this.field.type || 'text';

    if (this.field.type === 'number') {
      this.field.type = 'tel';
    }
  }
}
