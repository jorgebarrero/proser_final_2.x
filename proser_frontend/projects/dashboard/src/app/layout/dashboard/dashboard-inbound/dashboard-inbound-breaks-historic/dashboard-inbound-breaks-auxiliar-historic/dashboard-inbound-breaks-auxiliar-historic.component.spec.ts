import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboundBreaksAuxiliarHistoricComponent } from './dashboard-inbound-breaks-auxiliar-historic.component';

describe('DashboardInboundBreaksAuxiliarHistoricComponent', () => {
  let component: DashboardInboundBreaksAuxiliarHistoricComponent;
  let fixture: ComponentFixture<DashboardInboundBreaksAuxiliarHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboundBreaksAuxiliarHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboundBreaksAuxiliarHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
