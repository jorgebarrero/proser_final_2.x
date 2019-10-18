import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvShiftChangeListComponent } from './crud-inv-shift-change-list.component';

describe('CrudInvShiftChangeListComponent', () => {
  let component: CrudInvShiftChangeListComponent;
  let fixture: ComponentFixture<CrudInvShiftChangeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvShiftChangeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvShiftChangeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
