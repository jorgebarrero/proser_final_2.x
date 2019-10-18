import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboundCallsComponent } from './dashboard-inbound-calls.component';

describe('DashboardInboundCallsComponent', () => {
  let component: DashboardInboundCallsComponent;
  let fixture: ComponentFixture<DashboardInboundCallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboundCallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboundCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
