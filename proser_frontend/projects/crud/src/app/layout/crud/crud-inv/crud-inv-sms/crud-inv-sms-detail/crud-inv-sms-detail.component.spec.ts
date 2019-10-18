import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvSmsDetailComponent } from './crud-inv-sms-detail.component';

describe('CrudInvSmsDetailComponent', () => {
  let component: CrudInvSmsDetailComponent;
  let fixture: ComponentFixture<CrudInvSmsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvSmsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvSmsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
