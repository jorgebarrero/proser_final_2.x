import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAuxHourListComponent } from './crud-aux-hour-list.component';

describe('CrudAuxHourListComponent', () => {
  let component: CrudAuxHourListComponent;
  let fixture: ComponentFixture<CrudAuxHourListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudAuxHourListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudAuxHourListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
