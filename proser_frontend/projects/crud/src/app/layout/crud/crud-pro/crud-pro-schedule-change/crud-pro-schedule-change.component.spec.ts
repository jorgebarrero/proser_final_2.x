import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudProScheduleChangeComponent } from './crud-pro-schedule-change.component';

describe('CrudProScheduleChangeComponent', () => {
  let component: CrudProScheduleChangeComponent;
  let fixture: ComponentFixture<CrudProScheduleChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudProScheduleChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudProScheduleChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
