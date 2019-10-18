import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignationReportListComponent } from './assignation-report-list.component';

describe('AssignationReportListComponent', () => {
  let component: AssignationReportListComponent;
  let fixture: ComponentFixture<AssignationReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignationReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignationReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
