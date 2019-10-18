import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionReportComponent } from './connection-report.component';

describe('ConnectionReportComponent', () => {
  let component: ConnectionReportComponent;
  let fixture: ComponentFixture<ConnectionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
