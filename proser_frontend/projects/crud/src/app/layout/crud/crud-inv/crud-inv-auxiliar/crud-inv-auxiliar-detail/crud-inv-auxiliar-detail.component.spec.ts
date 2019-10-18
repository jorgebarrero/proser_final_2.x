import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvAuxiliarDetailComponent } from './crud-inv-auxiliar-detail.component';

describe('CrudInvAuxiliarDetailComponent', () => {
  let component: CrudInvAuxiliarDetailComponent;
  let fixture: ComponentFixture<CrudInvAuxiliarDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvAuxiliarDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvAuxiliarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
