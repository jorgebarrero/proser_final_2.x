import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOutboundLevelsComponent } from './dashboard-outbound-levels.component';

describe('DashboardOutboundLevelsComponent', () => {
  let component: DashboardOutboundLevelsComponent;
  let fixture: ComponentFixture<DashboardOutboundLevelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOutboundLevelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutboundLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
