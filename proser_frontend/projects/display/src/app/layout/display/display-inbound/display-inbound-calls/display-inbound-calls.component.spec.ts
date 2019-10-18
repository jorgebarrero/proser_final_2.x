import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInboundCallsComponent } from './display-inbound-calls.component';

describe('DisplayInboundCallsComponent', () => {
  let component: DisplayInboundCallsComponent;
  let fixture: ComponentFixture<DisplayInboundCallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayInboundCallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInboundCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
