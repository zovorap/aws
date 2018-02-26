import { NgModule } from '@angular/core';
import { CommonModule as NgCommonModule } from '@angular/common';

import { environment } from '~env/environment';
import { ClientModule } from 'app/client/client.module';
import { CommonModule } from '~common/common.module';
import { PagesRoutingModule } from 'app/pages/pages-routing.module';
import { DemoRoutingModule } from 'app/demo/demo-routing.module';
import { LayoutService } from './layout.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { SilkScreenComponent } from './silk-screen/silk-screen.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

let imports = [
  NgCommonModule,
  CommonModule,
  PagesRoutingModule,
  ClientModule
];

if (!environment.production) {
  imports.push(DemoRoutingModule);
}

@NgModule({
  imports: imports,
  exports: [
    FooterComponent,
    HeaderComponent,
    ToolbarComponent,
    SilkScreenComponent
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    NavComponent,
    ToolbarComponent,
    SilkScreenComponent
  ],
  providers: [
    LayoutService
  ]
})
export class LayoutModule { }
