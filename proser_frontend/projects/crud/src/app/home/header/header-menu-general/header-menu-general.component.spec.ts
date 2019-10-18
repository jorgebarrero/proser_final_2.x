import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuGeneralComponent } from './header-menu-general.component';

describe('HeaderMenuGeneralComponent', () => {
  let component: HeaderMenuGeneralComponent;
  let fixture: ComponentFixture<HeaderMenuGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMenuGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
