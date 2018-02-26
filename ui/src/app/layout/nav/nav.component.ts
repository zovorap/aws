import { Component, ViewEncapsulation } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import actions from '~app/app.actions';
import { IAppState, INavItem } from '~schema';

@Component({
  selector: 'lk-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent {
  @select(['nav', 'items'])
  public navItems$: Observable<INavItem[]>;

  @select(['nav', 'isExpanded'])
  public isExpanded$: Observable<boolean>;

  constructor(private store: NgRedux<IAppState>) { }

  public keepMenuOpen(event: MouseEvent): void {
    const { nav } = this.store.getState();

    if (!!nav.isExpanded && !!event && !!event.stopPropagation) {
      event.stopPropagation();
    }
  }
}
