import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvClientComponent } from './crud-inv-client.component';

describe('CrudInvClientComponent', () => {
  let component: CrudInvClientComponent;
  let fixture: ComponentFixture<CrudInvClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
