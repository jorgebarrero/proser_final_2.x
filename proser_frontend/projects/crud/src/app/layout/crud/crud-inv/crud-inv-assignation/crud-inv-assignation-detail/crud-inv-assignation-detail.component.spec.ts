import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvAssignationDetailComponent } from './crud-inv-assignation-detail.component';

describe('CrudInvAssignationDetailComponent', () => {
  let component: CrudInvAssignationDetailComponent;
  let fixture: ComponentFixture<CrudInvAssignationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvAssignationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvAssignationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
