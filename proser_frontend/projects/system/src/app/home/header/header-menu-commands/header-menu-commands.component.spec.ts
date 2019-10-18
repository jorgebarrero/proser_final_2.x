import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HeaderMenuCommandsComponent } from "./header-menu-commands.component";

describe("HeaderMenuCommandsComponent", () => {
  let component: HeaderMenuCommandsComponent;
  let fixture: ComponentFixture<HeaderMenuCommandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderMenuCommandsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
