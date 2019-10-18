import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOutboundAgentsPieComponent } from './display-outbound-agents-pie.component';

describe('DisplayOutboundAgentsPieComponent', () => {
  let component: DisplayOutboundAgentsPieComponent;
  let fixture: ComponentFixture<DisplayOutboundAgentsPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayOutboundAgentsPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOutboundAgentsPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
