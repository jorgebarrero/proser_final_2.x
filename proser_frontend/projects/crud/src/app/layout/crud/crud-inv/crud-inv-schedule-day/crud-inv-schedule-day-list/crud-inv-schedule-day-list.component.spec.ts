import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvScheduleDayListComponent } from './crud-inv-schedule-day-list.component';

describe('CrudInvScheduleDayListComponent', () => {
  let component: CrudInvScheduleDayListComponent;
  let fixture: ComponentFixture<CrudInvScheduleDayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvScheduleDayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvScheduleDayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
