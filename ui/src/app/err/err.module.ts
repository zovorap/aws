import { NgModule } from '@angular/core';

import { ErrRoutingModule } from './err-routing.module';
import { Err404Component } from './err404/err404.component';

@NgModule({
  exports: [
    ErrRoutingModule
  ],
  declarations: [
    Err404Component
  ]
})
export class ErrModule { }
