import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvAuxiliarListComponent } from './crud-inv-auxiliar-list.component';

describe('CrudInvAuxiliarListComponent', () => {
  let component: CrudInvAuxiliarListComponent;
  let fixture: ComponentFixture<CrudInvAuxiliarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvAuxiliarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvAuxiliarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
