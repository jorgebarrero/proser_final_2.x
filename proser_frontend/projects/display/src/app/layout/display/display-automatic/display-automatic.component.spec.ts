import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAutomaticComponent } from './display-automatic.component';

describe('DisplayAutomaticComponent', () => {
  let component: DisplayAutomaticComponent;
  let fixture: ComponentFixture<DisplayAutomaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayAutomaticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAutomaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
