import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvAgentRoleComponent } from './crud-inv-agent-role.component';

describe('CrudInvAgentRoleComponent', () => {
  let component: CrudInvAgentRoleComponent;
  let fixture: ComponentFixture<CrudInvAgentRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvAgentRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvAgentRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
