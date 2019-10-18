import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAuxColorListComponent } from './crud-aux-color-list.component';

describe('CrudAuxColorListComponent', () => {
  let component: CrudAuxColorListComponent;
  let fixture: ComponentFixture<CrudAuxColorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudAuxColorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAuxColorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
