import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOutboundHighlightsHistoricComponent } from './display-outbound-highlights-historic.component';

describe('DisplayOutboundHighlightsHistoricComponent', () => {
  let component: DisplayOutboundHighlightsHistoricComponent;
  let fixture: ComponentFixture<DisplayOutboundHighlightsHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayOutboundHighlightsHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOutboundHighlightsHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
