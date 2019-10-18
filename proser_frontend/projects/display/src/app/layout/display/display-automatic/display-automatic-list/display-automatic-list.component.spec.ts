import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAutomaticListComponent } from './display-automatic-list.component';

describe('DisplayAutomaticListComponent', () => {
  let component: DisplayAutomaticListComponent;
  let fixture: ComponentFixture<DisplayAutomaticListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayAutomaticListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAutomaticListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
