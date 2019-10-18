import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvCalendarListComponent } from './crud-inv-calendar-list.component';

describe('CrudInvCalendarListComponent', () => {
  let component: CrudInvCalendarListComponent;
  let fixture: ComponentFixture<CrudInvCalendarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvCalendarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvCalendarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
