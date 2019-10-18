import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAuxHourComponent } from './crud-aux-hour.component';

describe('CrudAuxHourComponent', () => {
  let component: CrudAuxHourComponent;
  let fixture: ComponentFixture<CrudAuxHourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudAuxHourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAuxHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
