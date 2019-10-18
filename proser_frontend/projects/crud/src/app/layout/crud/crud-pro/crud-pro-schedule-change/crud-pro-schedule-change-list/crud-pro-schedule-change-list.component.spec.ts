import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudProScheduleChangeListComponent } from './crud-pro-schedule-change-list.component';

describe('CrudProScheduleChangeListComponent', () => {
  let component: CrudProScheduleChangeListComponent;
  let fixture: ComponentFixture<CrudProScheduleChangeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudProScheduleChangeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudProScheduleChangeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
