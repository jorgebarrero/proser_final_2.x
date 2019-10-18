import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudProScheduleChangeDetailComponent } from './crud-pro-schedule-change-detail.component';

describe('CrudProScheduleChangeDetailComponent', () => {
  let component: CrudProScheduleChangeDetailComponent;
  let fixture: ComponentFixture<CrudProScheduleChangeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudProScheduleChangeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudProScheduleChangeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
