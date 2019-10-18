import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOutboundListComponent } from './dashboard-outbound-list.component';

describe('DashboardOutboundListComponent', () => {
  let component: DashboardOutboundListComponent;
  let fixture: ComponentFixture<DashboardOutboundListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOutboundListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutboundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
