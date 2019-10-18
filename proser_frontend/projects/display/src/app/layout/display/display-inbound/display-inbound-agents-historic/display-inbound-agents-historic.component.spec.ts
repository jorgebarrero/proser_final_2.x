import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInboundAgentsHistoricComponent } from './display-inbound-agents-historic.component';

describe('DisplayInboundAgentsHistoricComponent', () => {
  let component: DisplayInboundAgentsHistoricComponent;
  let fixture: ComponentFixture<DisplayInboundAgentsHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayInboundAgentsHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInboundAgentsHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
