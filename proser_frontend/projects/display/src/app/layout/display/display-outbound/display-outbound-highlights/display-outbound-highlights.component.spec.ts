import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOutboundHighlightsComponent } from './display-outbound-highlights.component';

describe('DisplayOutboundHighlightsComponent', () => {
  let component: DisplayOutboundHighlightsComponent;
  let fixture: ComponentFixture<DisplayOutboundHighlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayOutboundHighlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOutboundHighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
