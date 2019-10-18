import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemIntroComponent } from './system-intro.component';

describe('SystemIntroComponent', () => {
  let component: SystemIntroComponent;
  let fixture: ComponentFixture<SystemIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
