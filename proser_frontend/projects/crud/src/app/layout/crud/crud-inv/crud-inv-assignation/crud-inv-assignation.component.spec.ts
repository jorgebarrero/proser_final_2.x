import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvAssignationComponent } from './crud-inv-assignation.component';

describe('CrudInvAssignationComponent', () => {
  let component: CrudInvAssignationComponent;
  let fixture: ComponentFixture<CrudInvAssignationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvAssignationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvAssignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
