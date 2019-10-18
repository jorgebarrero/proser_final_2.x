import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CrudUserbaseComponent } from "./crud-userbase.component";

describe("CrudUserbaseComponent", () => {
  let component: CrudUserbaseComponent;
  let fixture: ComponentFixture<CrudUserbaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrudUserbaseComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudUserbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
