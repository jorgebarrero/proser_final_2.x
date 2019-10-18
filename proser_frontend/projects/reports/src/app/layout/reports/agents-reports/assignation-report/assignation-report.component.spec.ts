import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignationReportComponent } from './assignation-report.component';

describe('AssignationReportComponent', () => {
  let component: AssignationReportComponent;
  let fixture: ComponentFixture<AssignationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
