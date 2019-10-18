import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOutboundBreaksAssignationsComponent } from './dashboard-outbound-agents-agentsAuxiliarResume-assignations.component';

describe('DashboardOutboundBreaksAssignationsComponent', () => {
  let component: DashboardOutboundBreaksAssignationsComponent;
  let fixture: ComponentFixture<DashboardOutboundBreaksAssignationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOutboundBreaksAssignationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutboundBreaksAssignationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
