import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboundHighlightsComponent } from './dashboard-inbound-highlights.component';

describe('DashboardInboundHighlightsComponent', () => {
  let component: DashboardInboundHighlightsComponent;
  let fixture: ComponentFixture<DashboardInboundHighlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboundHighlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboundHighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
