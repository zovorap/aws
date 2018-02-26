import { Component, ViewEncapsulation } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { IAppState, IAgentInfo } from '~schema';
import { getContrastColor, humanToHex } from '~utils';

@Component({
  selector: 'lk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  @select(['header', 'backgroundColor'])
  public backgroundColor$: Observable<string>;

  @select(['header', 'sections'])
  public sections$: Observable<string[]>;

  @select('title')
  public siteName$: Observable<string>;

  @select(['header', 'logo'])
  public logo$: Observable<string>;

  @select(['header', 'layout'])
  public layout$: Observable<string>;

  @select('agentInfo')
  public agent$: Observable<IAgentInfo>;

  constructor(private store: NgRedux<IAppState>) { }

  public isSectionVisible(sectionName: string): boolean {
    const { header } = this.store.getState();
    const sections = header.sections;

    return sections.indexOf(sectionName) > -1;
  }

  public getTextColor(): string {
    const { header } = this.store.getState();

    return getContrastColor(header.backgroundColor);
  }

  public getLayoutClass() {
    const { header } = this.store.getState();
    return 'layout-' + (header.layout || '').toLowerCase();
  }
}
