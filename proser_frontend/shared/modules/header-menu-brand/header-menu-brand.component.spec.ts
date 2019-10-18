import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuBrandComponent } from './header-menu-brand.component';

describe('HeaderMenuBrandComponent', () => {
  let component: HeaderMenuBrandComponent;
  let fixture: ComponentFixture<HeaderMenuBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMenuBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
