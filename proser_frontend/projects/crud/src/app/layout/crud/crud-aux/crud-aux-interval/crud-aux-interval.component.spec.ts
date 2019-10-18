import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAuxIntervalComponent } from './crud-aux-interval.component';

describe('CrudAuxIntervalComponent', () => {
  let component: CrudAuxIntervalComponent;
  let fixture: ComponentFixture<CrudAuxIntervalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudAuxIntervalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAuxIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
