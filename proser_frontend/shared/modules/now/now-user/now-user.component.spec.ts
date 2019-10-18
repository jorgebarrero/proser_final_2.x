import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NowUserComponent } from './now-user.component';

describe('NowUserComponent', () => {
  let component: NowUserComponent;
  let fixture: ComponentFixture<NowUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NowUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NowUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
