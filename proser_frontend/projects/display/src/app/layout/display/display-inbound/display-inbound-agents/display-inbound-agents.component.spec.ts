import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInboundAgentsComponent } from './display-inbound-agents.component';

describe('DisplayInboundAgentsComponent', () => {
  let component: DisplayInboundAgentsComponent;
  let fixture: ComponentFixture<DisplayInboundAgentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayInboundAgentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInboundAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
