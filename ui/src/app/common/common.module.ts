import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ToastrService } from './toastr/toastr.service';
import { ModalService } from './modal/modal.service';
import { ToastrComponent } from './toastr/toastr.component';
import { ModalComponent } from './modal/modal.component';
import { ToggleDirective } from './toggle/toggle.directive';
import { InputComponent } from './input/input.component';
import { FormComponent } from './form/form.component';
import { SubmitComponent } from './submit/submit.component';

const components = [
  ToggleDirective,
  ToastrComponent,
  ModalComponent,
  InputComponent,
  FormComponent,
  SubmitComponent
];

@NgModule({
  imports: [
    NgCommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: components,
  declarations: components,
  providers: [
    ToastrService,
    ModalService
  ]
})
export class CommonModule { }
