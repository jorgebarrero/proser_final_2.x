import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInboundListComponent } from './display-inbound-list.component';

describe('DisplayInboundListComponent', () => {
  let component: DisplayInboundListComponent;
  let fixture: ComponentFixture<DisplayInboundListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayInboundListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInboundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
