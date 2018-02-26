import { Injectable } from '@angular/core';
import { get as _get_, set as _set_ } from 'lodash';
import { dispatch } from '@angular-redux/store';

import { IAction, IBranding, INavItem, IWebsiteSettings, IHeader, IFooter } from '~schema';
import actions from '~app/app.actions';
import { BrandCssService } from './brand-css.service';

@Injectable()
export class LayoutService {
  public applySettings(settings: IWebsiteSettings): void {
    this.applyBranding(_get_(settings, 'branding'));
    this.applyHeader(_get_(settings, 'header'));
    this.applyFooter(_get_(settings, 'footer'));
    this.applyNavigation(_get_(settings, 'nav'));

    this.applyCss(_get_(settings, 'branding'));
  }

  @dispatch()
  private applyNavigation(nav: INavItem[]): IAction {
    return {
      type: actions.APPLY_NAVIGATION,
      nav
    };
  }

  @dispatch()
  private applyBranding(branding: IBranding): IAction {
    return {
      type: actions.APPLY_BRANDING,
      branding
    };
  }

  @dispatch()
  private applyHeader(header: IHeader): IAction {
    return {
      type: actions.APPLY_HEADER,
      header
    };
  }

  @dispatch()
  private applyFooter(footer: IFooter): IAction {
    return {
      type: actions.APPLY_FOOTER,
      footer
    };
  }

  private applyCss(branding: IBranding): void {
    if (!!branding) {
      const css = BrandCssService.getStyles(branding);
      const style = document.createElement('style');
      style.type = 'text/css';

      if (!!_get_(style, 'styleSheet')) {
        _set_(style, 'styleSheet.cssText', css);
      } else {
        style.appendChild(document.createTextNode(css));
      }

      const head = document.head || document.getElementsByTagName('head')[0];
      head.appendChild(style);
    }
  }
}
