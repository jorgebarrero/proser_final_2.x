import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboundModalBreaksHistoricComponent } from './dashboard-inbound-modal-breaks-historic.component';

describe('DashboardInboundModalBreaksHistoricComponent', () => {
  let component: DashboardInboundModalBreaksHistoricComponent;
  let fixture: ComponentFixture<DashboardInboundModalBreaksHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboundModalBreaksHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboundModalBreaksHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
