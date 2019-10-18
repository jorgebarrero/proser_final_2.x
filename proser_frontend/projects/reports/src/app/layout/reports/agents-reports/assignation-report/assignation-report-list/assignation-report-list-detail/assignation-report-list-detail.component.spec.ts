import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignationReportListDetailComponent } from './assignation-report-list-detail.component';

describe('AssignationReportListDetailComponent', () => {
  let component: AssignationReportListDetailComponent;
  let fixture: ComponentFixture<AssignationReportListDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignationReportListDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignationReportListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
