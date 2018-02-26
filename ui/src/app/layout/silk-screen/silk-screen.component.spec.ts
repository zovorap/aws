import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SilkScreenComponent } from './silk-screen.component';

describe('SilkScreenComponent', () => {
  let component: SilkScreenComponent;
  let fixture: ComponentFixture<SilkScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SilkScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SilkScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
