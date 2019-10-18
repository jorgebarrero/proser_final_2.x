import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOutboundModalTextComponent } from './dashboard-outbound-modal-text.component';

describe('DashboardOutboundModalTextComponent', () => {
  let component: DashboardOutboundModalTextComponent;
  let fixture: ComponentFixture<DashboardOutboundModalTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOutboundModalTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutboundModalTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
