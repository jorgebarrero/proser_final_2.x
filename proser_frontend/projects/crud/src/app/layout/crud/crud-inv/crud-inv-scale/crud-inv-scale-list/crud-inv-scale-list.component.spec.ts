import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvScaleListComponent } from './crud-inv-scale-list.component';

describe('CrudInvScaleListComponent', () => {
  let component: CrudInvScaleListComponent;
  let fixture: ComponentFixture<CrudInvScaleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvScaleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvScaleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
