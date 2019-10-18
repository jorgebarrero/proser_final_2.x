import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInboundBreaksAssignationsHistoricComponent } from './display-inbound-breaks-assignations-historic.component';

describe('DisplayInboundBreaksAssignationsHistoricComponent', () => {
  let component: DisplayInboundBreaksAssignationsHistoricComponent;
  let fixture: ComponentFixture<DisplayInboundBreaksAssignationsHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayInboundBreaksAssignationsHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInboundBreaksAssignationsHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
