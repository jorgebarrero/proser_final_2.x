import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOutboundCallsComponent } from './display-outbound-calls.component';

describe('DisplayOutboundCallsComponent', () => {
  let component: DisplayOutboundCallsComponent;
  let fixture: ComponentFixture<DisplayOutboundCallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayOutboundCallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOutboundCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
