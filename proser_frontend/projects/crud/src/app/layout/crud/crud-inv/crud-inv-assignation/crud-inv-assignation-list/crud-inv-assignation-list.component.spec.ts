import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvAssignationListComponent } from './crud-inv-assignation-list.component';

describe('CrudInvAssignationListComponent', () => {
  let component: CrudInvAssignationListComponent;
  let fixture: ComponentFixture<CrudInvAssignationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvAssignationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvAssignationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
