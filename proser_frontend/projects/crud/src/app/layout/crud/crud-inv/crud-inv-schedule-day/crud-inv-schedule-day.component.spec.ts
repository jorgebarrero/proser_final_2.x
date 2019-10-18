import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvScheduleDayComponent } from './crud-inv-schedule-day.component';

describe('CrudInvScheduleDayComponent', () => {
  let component: CrudInvScheduleDayComponent;
  let fixture: ComponentFixture<CrudInvScheduleDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvScheduleDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvScheduleDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
