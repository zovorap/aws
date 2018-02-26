import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { IToast } from '~schema';
import { ToastrService } from './toastr.service';

@Component({
  selector: 'lk-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToastrComponent {
  @select('toast')
  public toast$: Observable<IToast>;

  constructor(private toastrService: ToastrService) { }

  public hide() {
    this.toastrService.supress();
  }
}
