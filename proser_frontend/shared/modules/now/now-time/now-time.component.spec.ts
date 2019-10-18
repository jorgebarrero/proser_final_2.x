import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NowTimeComponent } from './now-time.component';

describe('NowTimeComponent', () => {
  let component: NowTimeComponent;
  let fixture: ComponentFixture<NowTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NowTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NowTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
