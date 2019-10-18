import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvScheduleListComponent } from './crud-inv-schedule-list.component';

describe('CrudInvScheduleListComponent', () => {
  let component: CrudInvScheduleListComponent;
  let fixture: ComponentFixture<CrudInvScheduleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvScheduleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
