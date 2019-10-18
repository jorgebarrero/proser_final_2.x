import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAuxLineComponent } from './crud-aux-line.component';

describe('CrudAuxLineComponent', () => {
  let component: CrudAuxLineComponent;
  let fixture: ComponentFixture<CrudAuxLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudAuxLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAuxLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
