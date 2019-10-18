import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuUserComponent } from './header-menu-user.component';

describe('HeaderMenuUserComponent', () => {
  let component: HeaderMenuUserComponent;
  let fixture: ComponentFixture<HeaderMenuUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMenuUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
