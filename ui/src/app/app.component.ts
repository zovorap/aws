import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { select, dispatch, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { AppService } from './app.service';
import { ClientService } from './client/client.service';
import { IBranding, IAppState } from '~schema';

@Component({
  selector: '#lk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @select('branding')
  public branding$: Observable<IBranding>;

  @select(['footer', 'backgroundColor'])
  public footerBackgroundColor$: Observable<string>;

  constructor(
    private appService: AppService,
    private clientService: ClientService,
    private store: NgRedux<IAppState>
  ) {
    appService.fetchWebsiteData();
  }

  public get hasBranding() {
    const { branding } = this.store.getState();
    return !!branding;
  }

  public get isBrandingError() {
    const { api } = this.store.getState();
    return !api.numberOfActiveRequests && !this.hasBranding;
  }
}
