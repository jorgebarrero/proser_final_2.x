import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvSupervisorComponent } from './crud-inv-supervisor.component';

describe('CrudInvSupervisorComponent', () => {
  let component: CrudInvSupervisorComponent;
  let fixture: ComponentFixture<CrudInvSupervisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvSupervisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
