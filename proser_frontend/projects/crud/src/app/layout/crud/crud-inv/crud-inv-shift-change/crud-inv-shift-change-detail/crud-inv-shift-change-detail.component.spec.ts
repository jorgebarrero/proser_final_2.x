import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvShiftChangeDetailComponent } from './crud-inv-shift-change-detail.component';

describe('CrudInvShiftChangeDetailComponent', () => {
  let component: CrudInvShiftChangeDetailComponent;
  let fixture: ComponentFixture<CrudInvShiftChangeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvShiftChangeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvShiftChangeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
