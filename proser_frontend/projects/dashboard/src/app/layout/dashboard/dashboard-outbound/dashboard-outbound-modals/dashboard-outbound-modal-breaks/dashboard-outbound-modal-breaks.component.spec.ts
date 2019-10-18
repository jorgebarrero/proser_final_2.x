import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaashboardOutboundModalBreaksComponent } from './dashboard-outbound-modal-breaks.component';

describe('DaashboardOutboundModalBreaksComponent', () => {
  let component: DaashboardOutboundModalBreaksComponent;
  let fixture: ComponentFixture<DaashboardOutboundModalBreaksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaashboardOutboundModalBreaksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaashboardOutboundModalBreaksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
