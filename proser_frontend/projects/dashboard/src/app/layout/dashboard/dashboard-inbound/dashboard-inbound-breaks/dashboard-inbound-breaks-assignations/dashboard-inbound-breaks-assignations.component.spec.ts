import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboundBreaksAssignationsComponent } from './dashboard-inbound-breaks-assignations.component';

describe('DashboardInboundBreaksAssignationsComponent', () => {
  let component: DashboardInboundBreaksAssignationsComponent;
  let fixture: ComponentFixture<DashboardInboundBreaksAssignationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboundBreaksAssignationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboundBreaksAssignationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
