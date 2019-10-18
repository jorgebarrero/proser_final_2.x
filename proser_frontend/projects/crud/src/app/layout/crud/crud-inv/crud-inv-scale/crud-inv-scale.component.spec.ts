import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvScaleComponent } from './crud-inv-scale.component';

describe('CrudInvScaleComponent', () => {
  let component: CrudInvScaleComponent;
  let fixture: ComponentFixture<CrudInvScaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvScaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
