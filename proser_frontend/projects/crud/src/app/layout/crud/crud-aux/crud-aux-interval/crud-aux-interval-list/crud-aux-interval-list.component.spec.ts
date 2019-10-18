import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAuxIntervalListComponent } from './crud-aux-interval-list.component';

describe('CrudAuxIntervalListComponent', () => {
  let component: CrudAuxIntervalListComponent;
  let fixture: ComponentFixture<CrudAuxIntervalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudAuxIntervalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAuxIntervalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
