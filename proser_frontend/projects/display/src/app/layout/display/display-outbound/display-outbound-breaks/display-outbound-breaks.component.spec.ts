import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DisplayOutboundBreaksComponent } from "./display-outbound-breaks.component";

describe("DisplayOutboundBreaksComponent", () => {
  let component: DisplayOutboundBreaksComponent;
  let fixture: ComponentFixture<DisplayOutboundBreaksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayOutboundBreaksComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOutboundBreaksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
