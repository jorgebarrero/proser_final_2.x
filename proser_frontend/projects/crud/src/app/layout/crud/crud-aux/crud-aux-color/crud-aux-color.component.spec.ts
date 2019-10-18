import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAuxColorComponent } from './crud-aux-color.component';

describe('CrudAuxColorComponent', () => {
  let component: CrudAuxColorComponent;
  let fixture: ComponentFixture<CrudAuxColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudAuxColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAuxColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
