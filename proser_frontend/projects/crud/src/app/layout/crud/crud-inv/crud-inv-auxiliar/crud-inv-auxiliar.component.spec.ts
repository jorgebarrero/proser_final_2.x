import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvAuxiliarComponent } from './crud-inv-auxiliar.component';

describe('CrudInvAuxiliarComponent', () => {
  let component: CrudInvAuxiliarComponent;
  let fixture: ComponentFixture<CrudInvAuxiliarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvAuxiliarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvAuxiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
