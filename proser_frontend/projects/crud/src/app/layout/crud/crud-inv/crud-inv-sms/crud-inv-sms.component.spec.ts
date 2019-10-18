import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvSmsComponent } from './crud-inv-sms.component';

describe('CrudInvSmsComponent', () => {
  let component: CrudInvSmsComponent;
  let fixture: ComponentFixture<CrudInvSmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvSmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
