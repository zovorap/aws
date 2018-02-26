import { Component, ViewEncapsulation } from '@angular/core';

import { ClientService } from 'app/client/client.service';

@Component({
  templateUrl: './session-expired.component.html',
  styleUrls: ['./session-expired.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SessionExpiredComponent {

  constructor(
    private clientService: ClientService
  ) { }

  public showLoginModal(): void {
    this.clientService.showLoginModal(true);
  }
}
