import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboundGraphComponent } from './dashboard-inbound-graph.component';

describe('DashboardInboundGraphComponent', () => {
  let component: DashboardInboundGraphComponent;
  let fixture: ComponentFixture<DashboardInboundGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboundGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboundGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
