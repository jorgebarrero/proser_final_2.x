import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOutboundCallsComponent } from './dashboard-outbound-calls.component';

describe('DashboardOutboundCallsComponent', () => {
  let component: DashboardOutboundCallsComponent;
  let fixture: ComponentFixture<DashboardOutboundCallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOutboundCallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutboundCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
