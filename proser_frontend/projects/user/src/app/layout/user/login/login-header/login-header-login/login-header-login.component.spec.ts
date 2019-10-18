import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginHeaderLoginComponent } from './login-header-login.component';

describe('LoginHeaderLoginComponent', () => {
  let component: LoginHeaderLoginComponent;
  let fixture: ComponentFixture<LoginHeaderLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginHeaderLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginHeaderLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
