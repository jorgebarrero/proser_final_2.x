import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInboundLevelsComponent } from './display-inbound-levels.component';

describe('DisplayInboundLevelsComponent', () => {
  let component: DisplayInboundLevelsComponent;
  let fixture: ComponentFixture<DisplayInboundLevelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayInboundLevelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInboundLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
