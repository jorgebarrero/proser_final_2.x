import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboundAgentsComponent } from './dashboard-inbound-agents.component';

describe('DashboardInboundAgentsComponent', () => {
  let component: DashboardInboundAgentsComponent;
  let fixture: ComponentFixture<DashboardInboundAgentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboundAgentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboundAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
