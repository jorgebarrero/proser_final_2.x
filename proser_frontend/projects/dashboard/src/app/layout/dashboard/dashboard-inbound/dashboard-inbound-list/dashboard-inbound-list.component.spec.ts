import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboundListComponent } from './dashboard-inbound-list.component';

describe('DashboardInboundListComponent', () => {
  let component: DashboardInboundListComponent;
  let fixture: ComponentFixture<DashboardInboundListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboundListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
