import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboundGroupsComponent } from './dashboard-inbound-groups.component';

describe('DashboardInboundGroupsComponent', () => {
  let component: DashboardInboundGroupsComponent;
  let fixture: ComponentFixture<DashboardInboundGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboundGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboundGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
