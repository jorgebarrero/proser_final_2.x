import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOutboundComponent } from './display-outbound.component';

describe('DisplayOutboundComponent', () => {
  let component: DisplayOutboundComponent;
  let fixture: ComponentFixture<DisplayOutboundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayOutboundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOutboundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
