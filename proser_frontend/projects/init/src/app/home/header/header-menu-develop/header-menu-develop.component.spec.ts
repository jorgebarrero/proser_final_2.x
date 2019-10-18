import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuDevelopComponent } from './header-menu-develop.component';

describe('HeaderMenuDevelopComponent', () => {
  let component: HeaderMenuDevelopComponent;
  let fixture: ComponentFixture<HeaderMenuDevelopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMenuDevelopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuDevelopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
