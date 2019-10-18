import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionReportListDetailComponent } from './connection-report-list-detail.component';

describe('ConnectionReportListDetailComponent', () => {
  let component: ConnectionReportListDetailComponent;
  let fixture: ComponentFixture<ConnectionReportListDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionReportListDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionReportListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
