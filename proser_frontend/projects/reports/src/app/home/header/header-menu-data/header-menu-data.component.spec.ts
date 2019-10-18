import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuDataComponent } from './header-menu-data.component';

describe('HeaderMenuDataComponent', () => {
  let component: HeaderMenuDataComponent;
  let fixture: ComponentFixture<HeaderMenuDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMenuDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
