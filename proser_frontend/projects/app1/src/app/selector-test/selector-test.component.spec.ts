import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorTestComponent } from './selector-test.component';

describe('SelectorTestComponent', () => {
  let component: SelectorTestComponent;
  let fixture: ComponentFixture<SelectorTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
