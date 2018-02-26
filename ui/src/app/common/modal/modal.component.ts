import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select, NgRedux } from '@angular-redux/store';

import { IAppState, IModal } from '~schema';
import { ModalService } from './modal.service';

@Component({
  selector: 'lk-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent {
  @select('modal')
  public modal$: Observable<IModal>;

  constructor(
    private modalService: ModalService,
    private store: NgRedux<IAppState>
  ) { }

  public hide(confirm = false): void {
    this.modalService.hide(confirm);
  }
}
