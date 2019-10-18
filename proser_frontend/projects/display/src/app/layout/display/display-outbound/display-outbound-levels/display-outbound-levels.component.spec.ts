import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOutboundLevelsComponent } from './display-outbound-levels.component';

describe('DisplayOutboundLevelsComponent', () => {
  let component: DisplayOutboundLevelsComponent;
  let fixture: ComponentFixture<DisplayOutboundLevelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayOutboundLevelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOutboundLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
