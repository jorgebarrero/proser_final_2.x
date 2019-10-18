import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboundLevelsComponent } from './dashboard-inbound-levels.component';

describe('DashboardInboundLevelsComponent', () => {
  let component: DashboardInboundLevelsComponent;
  let fixture: ComponentFixture<DashboardInboundLevelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboundLevelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboundLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
