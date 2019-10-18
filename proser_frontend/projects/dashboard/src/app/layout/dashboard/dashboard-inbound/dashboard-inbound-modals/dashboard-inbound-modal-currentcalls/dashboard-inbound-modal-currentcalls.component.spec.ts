import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboundModalCurrentcallsComponent } from './dashboard-inbound-modal-currentcalls.component';

describe('DashboardInboundModalCurrentcallsComponent', () => {
  let component: DashboardInboundModalCurrentcallsComponent;
  let fixture: ComponentFixture<DashboardInboundModalCurrentcallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboundModalCurrentcallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboundModalCurrentcallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
