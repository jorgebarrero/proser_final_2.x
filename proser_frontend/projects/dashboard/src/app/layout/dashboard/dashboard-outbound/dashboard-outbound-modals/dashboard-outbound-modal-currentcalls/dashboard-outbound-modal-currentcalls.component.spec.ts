import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOutboundModalCurrentcallsComponent } from './dashboard-outbound-modal-currentcalls.component';

describe('DashboardOutboundModalCurrentcallsComponent', () => {
  let component: DashboardOutboundModalCurrentcallsComponent;
  let fixture: ComponentFixture<DashboardOutboundModalCurrentcallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOutboundModalCurrentcallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutboundModalCurrentcallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
