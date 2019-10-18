import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOutboundGroupsComponent } from './dashboard-outbound-groups.component';

describe('DashboardOutboundGroupsComponent', () => {
  let component: DashboardOutboundGroupsComponent;
  let fixture: ComponentFixture<DashboardOutboundGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOutboundGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutboundGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
