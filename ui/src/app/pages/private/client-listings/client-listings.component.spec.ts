import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListingsComponent } from './client-listings.component';

describe('ClientListingsComponent', () => {
  let component: ClientListingsComponent;
  let fixture: ComponentFixture<ClientListingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientListingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
