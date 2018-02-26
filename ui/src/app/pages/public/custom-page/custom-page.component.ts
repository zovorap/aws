import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
