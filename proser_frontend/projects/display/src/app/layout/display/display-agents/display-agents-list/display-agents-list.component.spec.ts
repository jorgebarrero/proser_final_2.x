import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAgentsListComponent } from './display-agents-list.component';

describe('DisplayAgentsListComponent', () => {
  let component: DisplayAgentsListComponent;
  let fixture: ComponentFixture<DisplayAgentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayAgentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAgentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
