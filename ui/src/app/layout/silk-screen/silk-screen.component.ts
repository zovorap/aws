import { Component, ViewEncapsulation } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'lk-silk-screen',
  templateUrl: './silk-screen.component.html',
  styleUrls: ['./silk-screen.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SilkScreenComponent {
  @select(['api', 'numberOfActiveRequests'])
  public numberOfActiveRequests$: Observable<number>;
}
