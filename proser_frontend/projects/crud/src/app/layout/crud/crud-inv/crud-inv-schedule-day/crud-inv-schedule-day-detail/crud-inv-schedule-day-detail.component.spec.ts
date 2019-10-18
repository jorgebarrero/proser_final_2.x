import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvScheduleDayDetailComponent } from './crud-inv-schedule-day-detail.component';

describe('CrudInvScheduleDayDetailComponent', () => {
  let component: CrudInvScheduleDayDetailComponent;
  let fixture: ComponentFixture<CrudInvScheduleDayDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvScheduleDayDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvScheduleDayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
