import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAuxColorDetailComponent } from './crud-aux-color-detail.component';

describe('CrudAuxColorDetailComponent', () => {
  let component: CrudAuxColorDetailComponent;
  let fixture: ComponentFixture<CrudAuxColorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudAuxColorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAuxColorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
