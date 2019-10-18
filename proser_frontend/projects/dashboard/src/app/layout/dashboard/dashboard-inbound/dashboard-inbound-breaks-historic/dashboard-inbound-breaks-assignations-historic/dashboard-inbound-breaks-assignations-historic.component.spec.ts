import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboundBreaksAssignationsHistoricComponent } from './dashboard-inbound-breaks-assignations-historic.component';

describe('DashboardInboundBreaksAssignationsHistoricComponent', () => {
  let component: DashboardInboundBreaksAssignationsHistoricComponent;
  let fixture: ComponentFixture<DashboardInboundBreaksAssignationsHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboundBreaksAssignationsHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboundBreaksAssignationsHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
