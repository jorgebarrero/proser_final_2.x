import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboundBreaksAuxiliarComponent } from './dashboard-inbound-breaks-auxiliar.component';

describe('DashboardInboundBreaksAuxiliarComponent', () => {
  let component: DashboardInboundBreaksAuxiliarComponent;
  let fixture: ComponentFixture<DashboardInboundBreaksAuxiliarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboundBreaksAuxiliarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboundBreaksAuxiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
