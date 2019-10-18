import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuDahsboardComponent } from './header-menu-dahsboard.component';

describe('HeaderMenuDahsboardComponent', () => {
  let component: HeaderMenuDahsboardComponent;
  let fixture: ComponentFixture<HeaderMenuDahsboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMenuDahsboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuDahsboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
