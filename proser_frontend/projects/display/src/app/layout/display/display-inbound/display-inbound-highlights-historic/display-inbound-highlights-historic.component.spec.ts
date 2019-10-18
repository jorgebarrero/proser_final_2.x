import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInboundHighlightsHistoricComponent } from './display-inbound-highlights-historic.component';

describe('DisplayInboundHighlightsHistoricComponent', () => {
  let component: DisplayInboundHighlightsHistoricComponent;
  let fixture: ComponentFixture<DisplayInboundHighlightsHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayInboundHighlightsHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInboundHighlightsHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
