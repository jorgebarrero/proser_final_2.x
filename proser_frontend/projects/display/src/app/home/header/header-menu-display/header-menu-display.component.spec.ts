import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuDisplayComponent } from './header-menu-display.component';

describe('HeaderMenuDisplayComponent', () => {
  let component: HeaderMenuDisplayComponent;
  let fixture: ComponentFixture<HeaderMenuDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMenuDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
