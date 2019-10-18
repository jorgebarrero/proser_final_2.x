import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAuxLineListComponent } from './crud-aux-line-list.component';

describe('CrudAuxLineListComponent', () => {
  let component: CrudAuxLineListComponent;
  let fixture: ComponentFixture<CrudAuxLineListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudAuxLineListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAuxLineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
