import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOutboundGraphComponent } from './dashboard-outbound-graph.component';

describe('DashboardOutboundGraphComponent', () => {
  let component: DashboardOutboundGraphComponent;
  let fixture: ComponentFixture<DashboardOutboundGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOutboundGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutboundGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
