import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NowDateComponent } from './now-date.component';

describe('NowDateComponent', () => {
  let component: NowDateComponent;
  let fixture: ComponentFixture<NowDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NowDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NowDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
