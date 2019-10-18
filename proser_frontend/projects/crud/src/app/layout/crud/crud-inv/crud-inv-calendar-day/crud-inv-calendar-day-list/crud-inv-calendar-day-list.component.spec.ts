import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvCalendarDayListComponent } from './crud-inv-calendar-day-list.component';

describe('CrudInvCalendarDayListComponent', () => {
  let component: CrudInvCalendarDayListComponent;
  let fixture: ComponentFixture<CrudInvCalendarDayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvCalendarDayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvCalendarDayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
