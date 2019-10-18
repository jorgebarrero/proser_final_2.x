import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbandonedReportComponent } from './abandoned-report.component';

describe('AbandonedReportComponent', () => {
  let component: AbandonedReportComponent;
  let fixture: ComponentFixture<AbandonedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbandonedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbandonedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
