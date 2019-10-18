import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CrudUserbaseDetailComponent } from "./crud-userbase-detail.component";

describe("CrudUserbaseDetailComponent", () => {
  let component: CrudUserbaseDetailComponent;
  let fixture: ComponentFixture<CrudUserbaseDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrudUserbaseDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudUserbaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
