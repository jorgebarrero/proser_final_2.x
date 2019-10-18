import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudHcaAgentComponent } from './crud-hca-agent.component';

describe('CrudHcaAgentComponent', () => {
  let component: CrudHcaAgentComponent;
  let fixture: ComponentFixture<CrudHcaAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudHcaAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudHcaAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
