import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DashboardOutboundBreaksComponent } from "./dashboard-outbound-breaks.component";

describe("DashboardOutboundBreaksComponent", () => {
  let component: DashboardOutboundBreaksComponent;
  let fixture: ComponentFixture<DashboardOutboundBreaksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardOutboundBreaksComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutboundBreaksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
