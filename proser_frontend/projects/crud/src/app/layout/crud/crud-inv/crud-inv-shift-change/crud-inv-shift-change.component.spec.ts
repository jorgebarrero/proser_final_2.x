import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvShiftChangeComponent } from './crud-inv-shift-change.component';

describe('CrudInvShiftChangeComponent', () => {
  let component: CrudInvShiftChangeComponent;
  let fixture: ComponentFixture<CrudInvShiftChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvShiftChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvShiftChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
