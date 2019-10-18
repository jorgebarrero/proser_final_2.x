import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvServiceListComponent } from './crud-inv-service-list.component';

describe('CrudInvServiceListComponent', () => {
  let component: CrudInvServiceListComponent;
  let fixture: ComponentFixture<CrudInvServiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvServiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
