import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvCalendarDayDetailComponent } from './crud-inv-calendar-day-detail.component';

describe('CrudInvCalendarDayDetailComponent', () => {
  let component: CrudInvCalendarDayDetailComponent;
  let fixture: ComponentFixture<CrudInvCalendarDayDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvCalendarDayDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvCalendarDayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
