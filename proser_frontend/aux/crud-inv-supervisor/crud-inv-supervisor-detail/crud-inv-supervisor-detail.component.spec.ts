import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvSupervisorDetailComponent } from './crud-inv-supervisor-detail.component';

describe('CrudInvSupervisorDetailComponent', () => {
  let component: CrudInvSupervisorDetailComponent;
  let fixture: ComponentFixture<CrudInvSupervisorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvSupervisorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvSupervisorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
