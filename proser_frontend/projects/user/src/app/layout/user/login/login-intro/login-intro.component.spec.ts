import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginIntroComponent } from './login-intro.component';

describe('LoginIntroComponent', () => {
  let component: LoginIntroComponent;
  let fixture: ComponentFixture<LoginIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
