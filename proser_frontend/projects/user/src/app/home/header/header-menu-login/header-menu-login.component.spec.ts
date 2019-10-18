import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuLoginComponent } from './header-menu-login.component';

describe('HeaderMenuLoginComponent', () => {
  let component: HeaderMenuLoginComponent;
  let fixture: ComponentFixture<HeaderMenuLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMenuLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
