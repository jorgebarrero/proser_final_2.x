import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboundModalTextComponent } from './dashboard-inbound-modal-text.component';

describe('DashboardInboundModalTextComponent', () => {
  let component: DashboardInboundModalTextComponent;
  let fixture: ComponentFixture<DashboardInboundModalTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboundModalTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboundModalTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
