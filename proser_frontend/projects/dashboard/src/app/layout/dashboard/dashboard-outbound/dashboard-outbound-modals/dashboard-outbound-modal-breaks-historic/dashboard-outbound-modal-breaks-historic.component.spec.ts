import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOutboundModalBreaksHistoricComponent } from './dashboard-outbound-modal-breaks-historic.component';

describe('DashboardOutboundModalBreaksHistoricComponent', () => {
  let component: DashboardOutboundModalBreaksHistoricComponent;
  let fixture: ComponentFixture<DashboardOutboundModalBreaksHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOutboundModalBreaksHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutboundModalBreaksHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
