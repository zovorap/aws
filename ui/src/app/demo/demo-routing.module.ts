import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrandingComponent } from './branding/branding.component';
import { ModalComponent } from './modal/modal.component';

const routes: Routes = [
  { path: 'demo', component: BrandingComponent },
  { path: 'demo-modal', component: ModalComponent, outlet: 'modal' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
