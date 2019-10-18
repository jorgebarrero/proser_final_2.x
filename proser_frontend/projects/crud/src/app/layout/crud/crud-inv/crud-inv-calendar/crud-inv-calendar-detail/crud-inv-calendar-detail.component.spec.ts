import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvCalendarDetailComponent } from './crud-inv-calendar-detail.component';

describe('CrudInvCalendarDetailComponent', () => {
  let component: CrudInvCalendarDetailComponent;
  let fixture: ComponentFixture<CrudInvCalendarDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvCalendarDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvCalendarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
