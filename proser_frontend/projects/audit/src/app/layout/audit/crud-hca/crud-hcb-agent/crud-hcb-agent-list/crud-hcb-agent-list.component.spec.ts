import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudHcbAgentListComponent } from './crud-hcb-agent-list.component';

describe('CrudHcbAgentListComponent', () => {
  let component: CrudHcbAgentListComponent;
  let fixture: ComponentFixture<CrudHcbAgentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudHcbAgentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudHcbAgentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
