import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvAgentRoleDetailComponent } from './crud-inv-agent-role-detail.component';

describe('CrudInvAgentRoleDetailComponent', () => {
  let component: CrudInvAgentRoleDetailComponent;
  let fixture: ComponentFixture<CrudInvAgentRoleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvAgentRoleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvAgentRoleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
