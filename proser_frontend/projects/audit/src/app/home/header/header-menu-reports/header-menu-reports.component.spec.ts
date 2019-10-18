import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuReportsComponent } from './header-menu-reports.component';

describe('HeaderMenuReportsComponent', () => {
  let component: HeaderMenuReportsComponent;
  let fixture: ComponentFixture<HeaderMenuReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMenuReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
