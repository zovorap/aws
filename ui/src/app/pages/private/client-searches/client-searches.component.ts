import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClientService } from 'app/client/client.service';
import { NgRedux } from '@angular-redux/store/lib/src/components/ng-redux';
import { IAppState } from 'app/schema';

@Component({
  selector: 'lk-client-searches',
  templateUrl: './client-searches.component.html',
  styleUrls: ['./client-searches.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientSearchesComponent implements OnInit {
  constructor(
    private store: NgRedux<IAppState>,
    private clientService: ClientService
  ) { }

  ngOnInit() {
    const { client } = this.store.getState();
    this.clientService.getClientSearches(client.id);
  }
}
