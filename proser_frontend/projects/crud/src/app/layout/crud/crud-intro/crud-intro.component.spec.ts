import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudIntroComponent } from './crud-intro.component';

describe('CrudIntroComponent', () => {
  let component: CrudIntroComponent;
  let fixture: ComponentFixture<CrudIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
