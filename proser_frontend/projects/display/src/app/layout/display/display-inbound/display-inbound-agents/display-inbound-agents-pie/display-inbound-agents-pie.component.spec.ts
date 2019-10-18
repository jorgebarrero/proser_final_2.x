import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInboundAgentsPieComponent } from './display-inbound-agents-pie.component';

describe('DisplayInboundAgentsPieComponent', () => {
  let component: DisplayInboundAgentsPieComponent;
  let fixture: ComponentFixture<DisplayInboundAgentsPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayInboundAgentsPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInboundAgentsPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
