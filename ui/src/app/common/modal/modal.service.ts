import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { IModalSettings } from '~schema';
import { Modal } from './modal';

const MODAL_OUTLET = '(modal:';

@Injectable()
export class ModalService {
  private fromUrl: string;
  private modal: Modal;

  constructor(
    private router: Router
  ) {
    if (this.isModal(this.router.url)) {
      this.navigateOut();
    }

    this.addRouterListener();
  }

  public show(settings: IModalSettings): Modal {
    if (!!settings.url) {
      this.navigateIn(settings.url);
    }

    this.modal = new Modal(settings);

    return this.modal;
  }

  public hide(confirm = false): void {
    if (!!this.modal) {
      this.modal.close(confirm);
      this.modal = null;
      this.navigateOut();
    }
  }

  private addRouterListener() {
    this.router.events
      .subscribe((route: NavigationEnd): void => {
        if (route instanceof NavigationEnd) {
          // you can navigate out of the modal by clicking back button in the browser,
          // but you can not navigate in using browser forward button, since the modal could have subscribers and some options set up
          if (this.isModal(route.url) && (!this.modal || !this.modal.isActive)) {
            this.modal = null;
            this.navigateOut();
          } else if (!this.isModal(route.url) && !!this.modal && !!this.modal.isActive) {
            this.modal = null;
            this.modal.close();
          }
        }
      });
  }

  private navigateOut(): void {
    const from = 0;
    const to = this.router.url.lastIndexOf(MODAL_OUTLET);
    const url = this.router.url.substring(from, to);

    this.router.navigate([{ outlets: { modal: null }, primary: [url] }]);
  }

  private navigateIn(route: string): void {
    this.router.navigate([{ outlets: { modal: route } }]);
  }

  private isModal(url: string): boolean {
    return !!url && url.indexOf(MODAL_OUTLET) > 0;
  }

  private getModalUrl(url: string) {
    const from = url.lastIndexOf(MODAL_OUTLET) + MODAL_OUTLET.length;
    const to = url.lastIndexOf(')');
    return url.substring(from, to);
  }
}
