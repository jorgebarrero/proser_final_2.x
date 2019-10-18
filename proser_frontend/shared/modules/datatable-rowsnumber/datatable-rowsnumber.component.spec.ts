import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableRowsnumberComponent } from './datatable-rowsnumber.component';

describe('DatatableRowsnumberComponent', () => {
  let component: DatatableRowsnumberComponent;
  let fixture: ComponentFixture<DatatableRowsnumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableRowsnumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableRowsnumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
