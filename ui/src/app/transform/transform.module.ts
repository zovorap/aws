import { NgModule } from '@angular/core';

import { ClientMapper } from './client';
import { WebsiteSettingsMapper } from './website-settings';

@NgModule({
  providers: [
    WebsiteSettingsMapper,
    ClientMapper
  ]
})
export class TransformModule { }
