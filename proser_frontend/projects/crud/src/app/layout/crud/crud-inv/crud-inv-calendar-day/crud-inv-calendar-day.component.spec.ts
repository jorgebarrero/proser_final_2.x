import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvCalendarDayComponent } from './crud-inv-calendar-day.component';

describe('CrudInvCalendarDayComponent', () => {
  let component: CrudInvCalendarDayComponent;
  let fixture: ComponentFixture<CrudInvCalendarDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvCalendarDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvCalendarDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
