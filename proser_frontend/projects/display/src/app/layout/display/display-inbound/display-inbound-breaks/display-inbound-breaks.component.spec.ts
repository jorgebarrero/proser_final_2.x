import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DisplayInboundBreaksComponent } from "./display-inbound-breaks.component";

describe("DisplayInboundBreaksComponent", () => {
  let component: DisplayInboundBreaksComponent;
  let fixture: ComponentFixture<DisplayInboundBreaksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayInboundBreaksComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInboundBreaksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
