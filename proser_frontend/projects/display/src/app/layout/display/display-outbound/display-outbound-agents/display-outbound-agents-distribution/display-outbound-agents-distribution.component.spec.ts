import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOutboundAgentsDistributionComponent } from './display-outbound-agents-distribution.component';

describe('DisplayOutboundAgentsDistributionComponent', () => {
  let component: DisplayOutboundAgentsDistributionComponent;
  let fixture: ComponentFixture<DisplayOutboundAgentsDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayOutboundAgentsDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOutboundAgentsDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
