import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOutboundHighlightsComponent } from './dashboard-outbound-highlights.component';

describe('DashboardOutboundHighlightsComponent', () => {
  let component: DashboardOutboundHighlightsComponent;
  let fixture: ComponentFixture<DashboardOutboundHighlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOutboundHighlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutboundHighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
