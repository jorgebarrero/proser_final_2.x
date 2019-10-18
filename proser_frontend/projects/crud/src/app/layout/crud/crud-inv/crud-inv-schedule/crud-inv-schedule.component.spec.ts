import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvScheduleComponent } from './crud-inv-schedule.component';

describe('CrudInvScheduleComponent', () => {
  let component: CrudInvScheduleComponent;
  let fixture: ComponentFixture<CrudInvScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
