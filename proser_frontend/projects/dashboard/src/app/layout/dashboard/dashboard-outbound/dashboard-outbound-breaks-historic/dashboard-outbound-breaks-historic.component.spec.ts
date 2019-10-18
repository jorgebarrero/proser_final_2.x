import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOutboundBreaksHistoricComponent } from './dashboard-outbound-breaks-historic.component';

describe('DashboardOutboundBreaksHistoricComponent', () => {
  let component: DashboardOutboundBreaksHistoricComponent;
  let fixture: ComponentFixture<DashboardOutboundBreaksHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOutboundBreaksHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutboundBreaksHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
