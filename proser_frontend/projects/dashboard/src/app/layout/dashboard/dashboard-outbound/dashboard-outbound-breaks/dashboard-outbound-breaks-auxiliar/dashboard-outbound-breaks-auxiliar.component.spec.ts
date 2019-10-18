import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOutboundBreaksAuxiliarComponent } from './dashboard-outbound-agents-BreaksResume-breaks.component';

describe('DashboardOutboundBreaksAuxiliarComponent', () => {
  let component: DashboardOutboundBreaksAuxiliarComponent;
  let fixture: ComponentFixture<DashboardOutboundBreaksAuxiliarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOutboundBreaksAuxiliarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutboundBreaksAuxiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
