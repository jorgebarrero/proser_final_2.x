import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOutboundHighlightsHistoricComponent } from './dashboard-outbound-highlights-historic.component';

describe('DashboardOutboundHighlightsHistoricComponent', () => {
  let component: DashboardOutboundHighlightsHistoricComponent;
  let fixture: ComponentFixture<DashboardOutboundHighlightsHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOutboundHighlightsHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutboundHighlightsHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
