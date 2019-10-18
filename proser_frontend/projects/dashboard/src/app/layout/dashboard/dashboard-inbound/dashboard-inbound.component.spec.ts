import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboundComponent } from './dashboard-inbound.component';

describe('DashboardInboundComponent', () => {
  let component: DashboardInboundComponent;
  let fixture: ComponentFixture<DashboardInboundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
