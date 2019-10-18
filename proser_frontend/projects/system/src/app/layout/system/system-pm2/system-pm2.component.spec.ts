import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemPm2Component } from './system-pm2.component';

describe('SystemPm2Component', () => {
  let component: SystemPm2Component;
  let fixture: ComponentFixture<SystemPm2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemPm2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemPm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
