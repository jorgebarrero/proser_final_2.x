import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInboundBreaksHistoricComponent } from './display-inbound-breaks-historic.component';

describe('DisplayInboundBreaksHistoricComponent', () => {
  let component: DisplayInboundBreaksHistoricComponent;
  let fixture: ComponentFixture<DisplayInboundBreaksHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayInboundBreaksHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInboundBreaksHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
