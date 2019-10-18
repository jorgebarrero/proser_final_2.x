import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOutboundComponent } from './dashboard-outbound.component';

describe('DashboardOutboundComponent', () => {
  let component: DashboardOutboundComponent;
  let fixture: ComponentFixture<DashboardOutboundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOutboundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutboundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
