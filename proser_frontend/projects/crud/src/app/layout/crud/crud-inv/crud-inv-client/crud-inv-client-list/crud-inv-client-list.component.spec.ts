import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvClientListComponent } from './crud-inv-client-list.component';

describe('CrudInvClientListComponent', () => {
  let component: CrudInvClientListComponent;
  let fixture: ComponentFixture<CrudInvClientListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvClientListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
