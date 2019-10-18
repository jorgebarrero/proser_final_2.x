import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowIntroComponent } from './show-intro.component';

describe('ShowIntroComponent', () => {
  let component: ShowIntroComponent;
  let fixture: ComponentFixture<ShowIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
