import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAuxIntervalDetailComponent } from './crud-aux-interval-detail.component';

describe('CrudAuxIntervalDetailComponent', () => {
  let component: CrudAuxIntervalDetailComponent;
  let fixture: ComponentFixture<CrudAuxIntervalDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudAuxIntervalDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAuxIntervalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
