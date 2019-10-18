import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOutboundListComponent } from './display-outbound-list.component';

describe('DisplayOutboundListComponent', () => {
  let component: DisplayOutboundListComponent;
  let fixture: ComponentFixture<DisplayOutboundListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayOutboundListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOutboundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
