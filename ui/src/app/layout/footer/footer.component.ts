import { Component, ViewEncapsulation } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { get as _get_, filter as _filter_ } from 'lodash';

import { IAppState, IAgentInfo, ISocialMedia, IAgency } from '~schema';
import { getContrastColor, isLight } from '~utils';

@Component({
  selector: 'lk-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent {
  @select('title')
  public siteName$: Observable<string>;

  @select('agentInfo')
  public agent$: Observable<IAgentInfo>;

  @select(['footer', 'disclaimer'])
  public disclaimer$: Observable<string>;

  constructor(private store: NgRedux<IAppState>) { }

  public get textColor(): string {
    const { footer } = this.store.getState();

    return getContrastColor(footer.backgroundColor);
  }

  public get socialMedia(): ISocialMedia[] {
    const { agentInfo } = this.store.getState();

    return _filter_(agentInfo.socialMedia, (el) => {
      return !!el.link;
    });
  }

  public get cssClasses(): string {
    const { footer } = this.store.getState();

    return 'layout-' + (footer.layout || '').toLowerCase() +
      (isLight(footer.backgroundColor) ? ' is-bordered' : '');
  }

  public get agencies(): IAgency[] {
    const { agentInfo } = this.store.getState();
    return this.rearrangeAgencies(agentInfo);
  }

  public get agencyCssClass(): string {
    return 'col-md-' + 12 / this.agencies.length;
  }

  public get footerLayout(): string {
    const { footer } = this.store.getState();
    return (footer.layout || '').toLowerCase();
  }

  public isLogoVisible(): boolean {
    const { agentInfo } = this.store.getState();
    return this.footerLayout !== 'b' && !!agentInfo.agencyLogo;
  }

  private rearrangeAgencies(data: IAgentInfo): IAgency[] {
    let agencies = _get_(data, 'agencies');

    if (!!agencies) {
      if (this.footerLayout === 'b') {
        // display only main agency
        agencies = [agencies[0]];
      } else if (agencies.length === 3) {
        // put main agency in the middle if number of agencies === 3 (max number of agencies)
        const mainAgency = agencies[0];
        agencies[0] = agencies[1];
        agencies[1] = mainAgency;
      }
    }

    return agencies;
  }
}
