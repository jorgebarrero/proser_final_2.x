import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvAgentComponent } from './crud-inv-agent.component';

describe('CrudInvAgentComponent', () => {
  let component: CrudInvAgentComponent;
  let fixture: ComponentFixture<CrudInvAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
