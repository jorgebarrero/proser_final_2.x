import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuCallsComponent } from './header-menu-calls.component';

describe('HeaderMenuCallsComponent', () => {
  let component: HeaderMenuCallsComponent;
  let fixture: ComponentFixture<HeaderMenuCallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMenuCallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
