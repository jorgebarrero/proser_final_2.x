import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudHcaAgentListComponent } from './crud-hca-agent-list.component';

describe('CrudHcaAgentListComponent', () => {
  let component: CrudHcaAgentListComponent;
  let fixture: ComponentFixture<CrudHcaAgentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudHcaAgentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudHcaAgentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
