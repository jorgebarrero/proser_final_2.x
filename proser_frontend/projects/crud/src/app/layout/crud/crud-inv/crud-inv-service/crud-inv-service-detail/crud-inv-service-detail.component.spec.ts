import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvServiceDetailComponent } from './crud-inv-service-detail.component';

describe('CrudInvServiceDetailComponent', () => {
  let component: CrudInvServiceDetailComponent;
  let fixture: ComponentFixture<CrudInvServiceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvServiceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
