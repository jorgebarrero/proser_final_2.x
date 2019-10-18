import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvSupervisorListComponent } from './crud-inv-supervisor-list.component';

describe('CrudInvSupervisorListComponent', () => {
  let component: CrudInvSupervisorListComponent;
  let fixture: ComponentFixture<CrudInvSupervisorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvSupervisorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvSupervisorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
