import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { get as _get_ } from 'lodash';

import actions from './app.actions';
import { IAction, IRawWebsiteSettings, IWebsiteSettings, IAgentInfo } from '~schema';
import { ApiService } from '~api/api.service';
import { WebsiteSettingsMapper } from '~transform/website-settings';
import { LayoutService } from './layout/layout.service';

@Injectable()
export class AppService {
  constructor(
    private apiService: ApiService,
    private websiteSettingsMapper: WebsiteSettingsMapper,
    private layoutService: LayoutService
  ) { }

  public fetchWebsiteData(): void {
    const params = {
      hostname: window.location.hostname
    };

    this.apiService
      .get<IRawWebsiteSettings>('website-settings', { params })
      .map<IRawWebsiteSettings, IWebsiteSettings>(data => this.websiteSettingsMapper.map(data))
      .subscribe((data: IWebsiteSettings) => {
        this.layoutService.applySettings(data);
        this.applyWebsiteTitle(_get_(data, 'title'));
        this.applyWebsiteFavicon(_get_(data, 'favicon'));
        this.applyAgentInfo(_get_(data, 'agentInfo'));
      });
  }

  @dispatch()
  private applyAgentInfo(agentInfo: IAgentInfo): IAction {
    return {
      type: actions.APPLY_AGENT_INFO,
      agentInfo
    };
  }

  @dispatch()
  private applyWebsiteTitle(title: string): IAction {
    document.title = title;

    return {
      type: actions.APPLY_WEBSITE_TITLE,
      title
    };
  }

  @dispatch()
  private applyWebsiteFavicon(favicon: string): IAction {
    let link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = favicon;

    document.getElementsByTagName('head')[0]
      .appendChild(link);

    return {
      type: actions.APPLY_WEBSITE_FAVICON,
      favicon
    };
  }
}
