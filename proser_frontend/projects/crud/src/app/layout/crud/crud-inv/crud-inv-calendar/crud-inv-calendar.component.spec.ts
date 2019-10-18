import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvCalendarComponent } from './crud-inv-calendar.component';

describe('CrudInvCalendarComponent', () => {
  let component: CrudInvCalendarComponent;
  let fixture: ComponentFixture<CrudInvCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
