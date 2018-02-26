import { Injectable } from '@angular/core';
import { get as _get_, set as _set_ } from 'lodash';

import { BaseMapper } from './base';
import { deepCamelCase, humanToHex } from '~utils';
import {
  IRawWebsiteSettings,
  IWebsiteSettings,
  IBranding,
  IRawNavItem,
  INavItem,
  INav,
  IHeader,
  IFooter,
  IAgentInfo,
  IAgency
} from '~schema';

@Injectable()
export class WebsiteSettingsMapper extends BaseMapper<IRawWebsiteSettings, IWebsiteSettings> {
  public map(src: IRawWebsiteSettings): IWebsiteSettings {
    let data = {
      agentInfo: deepCamelCase<IAgentInfo>(src.agent_info),
      branding: deepCamelCase<IBranding>(src.branding),
      favicon: src.favicon,
      footer: deepCamelCase<IFooter>(src.footer),
      header: deepCamelCase<IHeader>(src.header),
      nav: {
        items: this.getNav(src.nav)
      },
      title: src.title
    };

    _set_(data, 'header.backgroundColor', this.adjustBackgroundColor(data, 'header'));
    _set_(data, 'footer.backgroundColor', this.adjustBackgroundColor(data, 'footer'));

    return data;
  }

  private adjustBackgroundColor(data: IWebsiteSettings, section: string): string {
    const bkgColor = _get_(data, `${section}.backgroundColor`);
    return humanToHex(bkgColor === 'black' ? 'ddGray' : bkgColor);
  }

  private getNav(src: IRawNavItem[]): INavItem[] {
    let items = deepCamelCase<INavItem[]>(src);

    items.forEach((item: INavItem): void => {
      if (!!item.items && !!item.items.length) {
        item.isExpanded = false;
      }
    });

    return items;
  }
}
