import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DashboardInboundBreaksComponent } from "./dashboard-inbound-breaks.component";

describe("DashboardInboundBreaksComponent", () => {
  let component: DashboardInboundBreaksComponent;
  let fixture: ComponentFixture<DashboardInboundBreaksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardInboundBreaksComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboundBreaksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
