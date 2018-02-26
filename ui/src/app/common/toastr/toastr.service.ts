import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';

import actions from '~app/app.actions';
import { IAction, IToast } from '~schema';

@Injectable()
export class ToastrService {
  private toast: IToast;
  private que: IToast[] = [];
  private currentCountdown: number;
  private supressed: boolean;
  private showStartedAt: number;

  public pop(toast: IToast): void {
    this.que.push(toast);

    if (this.que.length === 1) {
      this.show();
    } else if (this.que.length === 2) {
      if (!!this.currentCountdown) {
        clearTimeout(this.currentCountdown);
      }

      setTimeout(() => {
        if (!this.supressed) {
          this.hide();
        }

        this.supressed = false;
      }, this.timeLeft);
    }
  }

  public supress() {
    this.hide();
    this.supressed = true;
  }

  private get lifeTime(): number {
    const MIN_LIFE_TIME = 1000;
    const NORMAL_LIFE_TIME = 3000;
    const MAX_LIFE_TIME = 60000;

    let lifeTime: number;

    if (this.que.length > 1) {
      lifeTime = 2000;
    } else {
      lifeTime = (this.toast.lifeTime === undefined) ? NORMAL_LIFE_TIME : this.toast.lifeTime;

      if (lifeTime === 0 || lifeTime > MAX_LIFE_TIME) {
        lifeTime = MAX_LIFE_TIME;
      } else if (lifeTime < MIN_LIFE_TIME) {
        lifeTime = MIN_LIFE_TIME;
      }
    }

    return lifeTime;
  }

  private get timeLeft(): number {
    const showTime = new Date().getTime() - this.showStartedAt;
    return Math.max(0, 2000 - showTime);
  }

  private tryToShowNext() {
    setTimeout(() => {
      if (!!this.que.length) {
        this.show();
      } else {
        this.kill();
      }
    }, 300); // buffer for animation
  }

  @dispatch()
  private show(): IAction {
    let toast = this.que[0];
    this.showStartedAt = new Date().getTime();

    this.toast = {
      ...toast,
      isActive: true,
      type: toast.type || 'info'
    };

    this.currentCountdown = setTimeout(this.hide.bind(this), this.lifeTime);

    return {
      type: actions.TOAST,
      toast: this.toast
    };
  }

  @dispatch()
  private hide(): IAction {
    this.toast.isActive = false;
    this.que.shift();
    this.currentCountdown = null;

    this.tryToShowNext();

    return {
      type: actions.TOAST,
      toast: this.toast
    };
  }

  @dispatch()
  private kill(): IAction {
    return {
      type: actions.TOAST,
      toast: null
    };
  }
}
