import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionReportListComponent } from './connection-report-list.component';

describe('ConnectionReportListComponent', () => {
  let component: ConnectionReportListComponent;
  let fixture: ComponentFixture<ConnectionReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
