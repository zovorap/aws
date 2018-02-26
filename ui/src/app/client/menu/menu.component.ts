import { Component, ViewEncapsulation } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { IAppState, IClientMenu } from '~schema';
import { ModalService } from '~common/modal/modal.service';
import { ClientService } from 'app/client/client.service';

@Component({
  selector: 'lk-client-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent {
  @select(['client', 'menu'])
  public menu$: Observable<IClientMenu>;

  constructor(
    private store: NgRedux<IAppState>,
    private modalService: ModalService,
    private clientService: ClientService
  ) { }

  public get clientName() {
    const { client } = this.store.getState();

    return `${client.firstName || ''} ${client.lastName || ''}`.trim() || 'Client Log In';
  }

  public get clientId() {
    const { client } = this.store.getState();

    return client.id;
  }

  public showLoginModal(): void {
    this.clientService.showLoginModal();
  }

  public logout(): void {
    this.clientService.logout();
  }
}
