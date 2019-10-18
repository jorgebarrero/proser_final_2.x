import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOutboundBreaksAssignationsHistoricComponent } from './dashboard-outbound-breaks-assignations-historic.component';

describe('DashboardOutboundBreaksAssignationsHistoricComponent', () => {
  let component: DashboardOutboundBreaksAssignationsHistoricComponent;
  let fixture: ComponentFixture<DashboardOutboundBreaksAssignationsHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOutboundBreaksAssignationsHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutboundBreaksAssignationsHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
