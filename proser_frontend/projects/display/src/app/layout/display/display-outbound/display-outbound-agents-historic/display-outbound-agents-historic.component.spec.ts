import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOutboundAgentsHistoricComponent } from './display-outbound-agents-historic.component';

describe('DisplayOutboundAgentsHistoricComponent', () => {
  let component: DisplayOutboundAgentsHistoricComponent;
  let fixture: ComponentFixture<DisplayOutboundAgentsHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayOutboundAgentsHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOutboundAgentsHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
