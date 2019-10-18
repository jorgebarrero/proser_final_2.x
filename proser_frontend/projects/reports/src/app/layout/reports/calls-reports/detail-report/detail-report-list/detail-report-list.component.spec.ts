import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailReportListComponent } from './detail-report-list.component';

describe('DetailReportListComponent', () => {
  let component: DetailReportListComponent;
  let fixture: ComponentFixture<DetailReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
