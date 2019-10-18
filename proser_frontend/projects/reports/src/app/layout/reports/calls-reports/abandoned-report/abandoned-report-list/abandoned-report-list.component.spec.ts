import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbandonedReportListComponent } from './abandoned-report-list.component';

describe('AbandonedReportListComponent', () => {
  let component: AbandonedReportListComponent;
  let fixture: ComponentFixture<AbandonedReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbandonedReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbandonedReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
