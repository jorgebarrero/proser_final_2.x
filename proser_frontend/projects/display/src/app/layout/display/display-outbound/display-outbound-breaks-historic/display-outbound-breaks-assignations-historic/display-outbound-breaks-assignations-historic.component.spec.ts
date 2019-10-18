import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOutboundBreaksAssignationsHistoricComponent } from './display-outbound-breaks-assignations-historic.component';

describe('DisplayOutboundBreaksAssignationsHistoricComponent', () => {
  let component: DisplayOutboundBreaksAssignationsHistoricComponent;
  let fixture: ComponentFixture<DisplayOutboundBreaksAssignationsHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayOutboundBreaksAssignationsHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOutboundBreaksAssignationsHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
