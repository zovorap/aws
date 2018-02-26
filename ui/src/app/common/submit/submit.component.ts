import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lk-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubmitComponent {
  @Input() public label = 'Submit';
  @Input() public cssClass = 'btn btn-success';
  public isActive = false;

  public makeActive(): void {
    this.isActive = true;
    setTimeout(() => this.isActive = false, 500);
  }
}
