import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInboundAgentsDistributionComponent } from './display-inbound-agents-distribution.component';

describe('DisplayInboundAgentsDistributionComponent', () => {
  let component: DisplayInboundAgentsDistributionComponent;
  let fixture: ComponentFixture<DisplayInboundAgentsDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayInboundAgentsDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInboundAgentsDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
