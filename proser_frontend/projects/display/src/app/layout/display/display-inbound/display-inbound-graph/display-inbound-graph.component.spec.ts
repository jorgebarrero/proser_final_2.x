import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInboundGraphComponent } from './display-inbound-graph.component';

describe('DisplayInboundGraphComponent', () => {
  let component: DisplayInboundGraphComponent;
  let fixture: ComponentFixture<DisplayInboundGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayInboundGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInboundGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
