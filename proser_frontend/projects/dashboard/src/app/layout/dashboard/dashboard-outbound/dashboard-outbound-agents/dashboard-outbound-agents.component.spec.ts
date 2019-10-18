import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOutboundAgentsComponent } from './dashboard-outbound-agents.component';

describe('DashboardOutboundAgentsComponent', () => {
  let component: DashboardOutboundAgentsComponent;
  let fixture: ComponentFixture<DashboardOutboundAgentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOutboundAgentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutboundAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
