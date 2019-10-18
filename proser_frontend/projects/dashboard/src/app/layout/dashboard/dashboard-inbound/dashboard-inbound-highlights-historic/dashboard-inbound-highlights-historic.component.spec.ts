import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboundHighlightsHistoricComponent } from './dashboard-inbound-highlights-historic.component';

describe('DashboardInboundHighlightsHistoricComponent', () => {
  let component: DashboardInboundHighlightsHistoricComponent;
  let fixture: ComponentFixture<DashboardInboundHighlightsHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboundHighlightsHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboundHighlightsHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
