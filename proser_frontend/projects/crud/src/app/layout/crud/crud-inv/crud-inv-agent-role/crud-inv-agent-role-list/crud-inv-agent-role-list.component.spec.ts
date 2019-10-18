import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvAgentRoleListComponent } from './crud-inv-agent-role-list.component';

describe('CrudInvAgentRoleListComponent', () => {
  let component: CrudInvAgentRoleListComponent;
  let fixture: ComponentFixture<CrudInvAgentRoleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvAgentRoleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvAgentRoleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
