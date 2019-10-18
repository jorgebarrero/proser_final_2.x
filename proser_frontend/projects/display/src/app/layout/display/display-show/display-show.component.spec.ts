import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayShowComponent } from './display-show.component';

describe('DisplayShowComponent', () => {
  let component: DisplayShowComponent;
  let fixture: ComponentFixture<DisplayShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
