import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuPeopleComponent } from './header-menu-people.component';

describe('HeaderMenuPeopleComponent', () => {
  let component: HeaderMenuPeopleComponent;
  let fixture: ComponentFixture<HeaderMenuPeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMenuPeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
