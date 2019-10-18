import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvScheduleDetailComponent } from './crud-inv-schedule-detail.component';

describe('CrudInvScheduleDetailComponent', () => {
  let component: CrudInvScheduleDetailComponent;
  let fixture: ComponentFixture<CrudInvScheduleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvScheduleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvScheduleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
