import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOutboundBreaksAuxiliarHistoricComponent } from './dashboard-outbound-breaks-auxiliar-historic.component';

describe('DashboardOutboundBreaksAuxiliarHistoricComponent', () => {
  let component: DashboardOutboundBreaksAuxiliarHistoricComponent;
  let fixture: ComponentFixture<DashboardOutboundBreaksAuxiliarHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOutboundBreaksAuxiliarHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutboundBreaksAuxiliarHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
