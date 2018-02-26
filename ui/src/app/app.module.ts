import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { RouterModule } from '@angular/router';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import { environment } from '~env/environment';
import { rootReducer, INITIAL_STATE } from './app.store';
import { IAppState } from '~schema';
import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { ApiModule } from './api/api.module';
import { DemoModule } from './demo/demo.module';
import { ClientModule } from './client/client.module';
import { CommonModule } from './common/common.module';
import { ErrModule } from './err/err.module';
import { LayoutModule } from './layout/layout.module';
import { PagesModule } from './pages/pages.module';
import { TransformModule } from '~transform/transform.module';
import { NavigationService } from './navigation.service';

let imports = [
  RouterModule.forRoot([]),
  BrowserModule,
  NgReduxModule,
  ApiModule,
  ClientModule,
  CommonModule,
  LayoutModule,
  PagesModule,
  TransformModule,
  ErrModule // keep this module import at the end (otherwise the routing will not work properly)
];

if (!environment.production) {
  imports.push(DemoModule);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: imports,
  providers: [
    AppService,
    NavigationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTools: DevToolsExtension
  ) {
    this.configureStore();
  }

  private configureStore() {
    const enhancer = (!environment.production && this.devTools.isEnabled()) ? [this.devTools.enhancer()] : [];
    this.ngRedux.configureStore(rootReducer, INITIAL_STATE, null, enhancer);
  }
}
