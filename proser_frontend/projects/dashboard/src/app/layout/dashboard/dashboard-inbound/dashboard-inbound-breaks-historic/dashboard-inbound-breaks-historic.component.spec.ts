import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboundBreaksHistoricComponent } from './dashboard-inbound-breaks-historic.component';

describe('DashboardInboundBreaksHistoricComponent', () => {
  let component: DashboardInboundBreaksHistoricComponent;
  let fixture: ComponentFixture<DashboardInboundBreaksHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboundBreaksHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboundBreaksHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
