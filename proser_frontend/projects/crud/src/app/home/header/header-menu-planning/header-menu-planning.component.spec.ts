import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuPlanningComponent } from './header-menu-planning.component';

describe('HeaderMenuPlanningComponent', () => {
  let component: HeaderMenuPlanningComponent;
  let fixture: ComponentFixture<HeaderMenuPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMenuPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
