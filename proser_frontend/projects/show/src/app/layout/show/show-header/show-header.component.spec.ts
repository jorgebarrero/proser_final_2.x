import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHeaderComponent } from './show-header.component';

describe('ShowHeaderComponent', () => {
  let component: ShowHeaderComponent;
  let fixture: ComponentFixture<ShowHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
