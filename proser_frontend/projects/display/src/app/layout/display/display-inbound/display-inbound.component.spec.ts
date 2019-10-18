import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInboundComponent } from './display-inbound.component';

describe('DisplayInboundComponent', () => {
  let component: DisplayInboundComponent;
  let fixture: ComponentFixture<DisplayInboundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayInboundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInboundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
