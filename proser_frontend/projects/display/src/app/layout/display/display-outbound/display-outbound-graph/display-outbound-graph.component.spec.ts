import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOutboundGraphComponent } from './display-outbound-graph.component';

describe('DisplayOutboundGraphComponent', () => {
  let component: DisplayOutboundGraphComponent;
  let fixture: ComponentFixture<DisplayOutboundGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayOutboundGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOutboundGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
