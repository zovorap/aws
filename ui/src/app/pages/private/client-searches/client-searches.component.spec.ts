import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSearchesComponent } from './client-searches.component';

describe('ClientSearchesComponent', () => {
  let component: ClientSearchesComponent;
  let fixture: ComponentFixture<ClientSearchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSearchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSearchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
