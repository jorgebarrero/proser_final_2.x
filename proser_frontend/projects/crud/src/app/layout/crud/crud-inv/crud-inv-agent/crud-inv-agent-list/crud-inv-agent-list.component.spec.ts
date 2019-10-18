import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvAgentListComponent } from './crud-inv-agent-list.component';

describe('CrudInvAgentListComponent', () => {
  let component: CrudInvAgentListComponent;
  let fixture: ComponentFixture<CrudInvAgentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvAgentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvAgentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
