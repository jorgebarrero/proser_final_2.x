import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOutboundAgentsComponent } from './display-outbound-agents.component';

describe('DisplayOutboundAgentsComponent', () => {
  let component: DisplayOutboundAgentsComponent;
  let fixture: ComponentFixture<DisplayOutboundAgentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayOutboundAgentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOutboundAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
