import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAuxLineDetailComponent } from './crud-aux-line-detail.component';

describe('CrudAuxLineDetailComponent', () => {
  let component: CrudAuxLineDetailComponent;
  let fixture: ComponentFixture<CrudAuxLineDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudAuxLineDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAuxLineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
