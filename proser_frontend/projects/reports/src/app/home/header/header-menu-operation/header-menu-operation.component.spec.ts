import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuOperationComponent } from './header-menu-operation.component';

describe('HeaderMenuOperationComponent', () => {
  let component: HeaderMenuOperationComponent;
  let fixture: ComponentFixture<HeaderMenuOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMenuOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
