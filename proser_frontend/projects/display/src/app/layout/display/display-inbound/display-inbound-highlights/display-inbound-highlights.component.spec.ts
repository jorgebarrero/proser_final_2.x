import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInboundHighlightsComponent } from './display-inbound-highlights.component';

describe('DisplayInboundHighlightsComponent', () => {
  let component: DisplayInboundHighlightsComponent;
  let fixture: ComponentFixture<DisplayInboundHighlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayInboundHighlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInboundHighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
