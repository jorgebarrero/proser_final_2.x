import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudHcbAgentComponent } from './crud-hcb-agent.component';

describe('CrudHcbAgentComponent', () => {
  let component: CrudHcbAgentComponent;
  let fixture: ComponentFixture<CrudHcbAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudHcbAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudHcbAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
