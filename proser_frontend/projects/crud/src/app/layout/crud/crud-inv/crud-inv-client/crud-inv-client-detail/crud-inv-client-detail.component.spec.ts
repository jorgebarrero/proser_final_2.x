import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvClientDetailComponent } from './crud-inv-client-detail.component';

describe('CrudInvClientDetailComponent', () => {
  let component: CrudInvClientDetailComponent;
  let fixture: ComponentFixture<CrudInvClientDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvClientDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvClientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
