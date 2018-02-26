import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { ModalService } from '~common/modal/modal.service';
import { IAppState } from '~schema';
@Component({
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent {
  constructor(
    private modalService: ModalService,
    private store: NgRedux<IAppState>
  ) { }

  public cancel() {
    this.hide();
  }

  public confirm() {
    this.hide(true);
  }

  private hide(confirm = false) {
    this.modalService.hide(confirm);
  }
}
