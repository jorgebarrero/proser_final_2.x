import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CrudUserListComponent } from "./crud-userbase-list.component";

describe("CrudUserListComponent", () => {
  let component: CrudUserListComponent;
  let fixture: ComponentFixture<CrudUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrudUserListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
