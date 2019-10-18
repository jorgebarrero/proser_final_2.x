import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAuxHourDetailComponent } from './crud-aux-hour-detail.component';

describe('CrudAuxHourDetailComponent', () => {
  let component: CrudAuxHourDetailComponent;
  let fixture: ComponentFixture<CrudAuxHourDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudAuxHourDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAuxHourDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
