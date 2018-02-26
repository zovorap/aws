import { Component, OnInit, OnDestroy, Input, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { dispatch } from '@angular-redux/store';

import { IAction } from '~schema';
import actions from './form.actions';

@Component({
  selector: 'lk-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() public id: string;
  @Input() public formGroup: FormGroup;

  private submit: EventEmitter<boolean>;

  constructor() {
    this.submit = new EventEmitter();
  }

  ngOnInit() {
    this.checkId();
    this.addToStore();

    this.formGroup.valueChanges
      .subscribe(this.change.bind(this));
  }

  ngOnDestroy() {
    this.removeFromStore();
  }

  public submitForm(): void {
    this.submit.emit();
    this.addSubmitAttempt();
  }

  private checkId() {
    if (!this.id) {
      throw new Error('Attribute \'id\' is required for the form');
    } else {
      const regex = /^[a-z0-9]+$/i;

      if (!regex.test(this.id)) {
        throw new Error(`Id of the form '${this.id}' should contain only alphanumeric characters`);
      }
    }
  }

  @dispatch()
  private addToStore(): IAction {
    return {
      type: actions.ADD_FORM,
      formId: this.id,
      form: this.formGroup
    };
  }

  @dispatch()
  private addSubmitAttempt(): IAction {
    return {
      type: actions.SUBMIT_FORM,
      formId: this.id
    };
  }

  @dispatch()
  private removeFromStore(): IAction {
    return {
      type: actions.REMOVE_FORM,
      formId: this.id
    };
  }

  @dispatch()
  private change(): IAction {
    return {
      type: actions.CHANGE_FORM,
      formId: this.id,
      form: this.formGroup
    };
  }
}
