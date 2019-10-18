import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaashboardInboundModalBreaksComponent } from './daashboard-inbound-modal-breaks.component';

describe('DaashboardInboundModalBreaksComponent', () => {
  let component: DaashboardInboundModalBreaksComponent;
  let fixture: ComponentFixture<DaashboardInboundModalBreaksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaashboardInboundModalBreaksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaashboardInboundModalBreaksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
