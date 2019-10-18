import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOutboundBreaksHistoricComponent } from './display-outbound-breaks-historic.component';

describe('DisplayOutboundBreaksHistoricComponent', () => {
  let component: DisplayOutboundBreaksHistoricComponent;
  let fixture: ComponentFixture<DisplayOutboundBreaksHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayOutboundBreaksHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOutboundBreaksHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
