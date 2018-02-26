import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '~common/common.module';
import { BrandingComponent } from './branding/branding.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    NgCommonModule,
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    BrandingComponent,
    ModalComponent
  ]
})
export class DemoModule { }
