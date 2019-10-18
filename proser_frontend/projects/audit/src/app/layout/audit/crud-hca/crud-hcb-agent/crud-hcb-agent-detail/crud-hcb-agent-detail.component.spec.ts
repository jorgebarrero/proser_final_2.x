import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudHcbAgentDetailComponent } from './crud-hcb-agent-detail.component';

describe('CrudHcbAgentDetailComponent', () => {
  let component: CrudHcbAgentDetailComponent;
  let fixture: ComponentFixture<CrudHcbAgentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudHcbAgentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudHcbAgentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
