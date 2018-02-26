import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';

import { NavigationService } from 'app/navigation.service';
import actions from '~app/app.actions';
import { IAction, IClient } from '~schema';
import { ModalService } from '~common/modal/modal.service';

@Injectable()
export class SessionService {
  constructor (
    private navigationService: NavigationService,
    private modalService: ModalService
  ) { }

  public startSession(client: IClient) {
    if (!!client && !!client.token) {
      localStorage.setItem('clientToken', client.token);
      this.applyClientData(client);
    }
  }

  public endSession() {
    localStorage.removeItem('clientToken');
    this.applyClientData(null);
  }

  public expireSession() {
    this.modalService.show({
      url: 'session-expired',
      hasControls: false,
      title: 'Session expired',
      onCancel: () => this.navigationService.goHome()
    });

    this.endSession();
  }

  public isLoggedIn(): boolean {
    return !!this.token;
  }

  public get token(): string {
    return localStorage.getItem('clientToken');
  }

  @dispatch()
  private applyClientData(data: IClient): IAction {
    return {
      type: actions.APPLY_CLIENT_DATA,
      data
    };
  }
}
