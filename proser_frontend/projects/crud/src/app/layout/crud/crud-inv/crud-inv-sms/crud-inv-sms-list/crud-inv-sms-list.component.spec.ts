import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvSmsListComponent } from './crud-inv-sms-list.component';

describe('CrudInvSmsListComponent', () => {
  let component: CrudInvSmsListComponent;
  let fixture: ComponentFixture<CrudInvSmsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvSmsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvSmsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
