import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvScaleDetailComponent } from './crud-inv-scale-detail.component';

describe('CrudInvScaleDetailComponent', () => {
  let component: CrudInvScaleDetailComponent;
  let fixture: ComponentFixture<CrudInvScaleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvScaleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvScaleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
