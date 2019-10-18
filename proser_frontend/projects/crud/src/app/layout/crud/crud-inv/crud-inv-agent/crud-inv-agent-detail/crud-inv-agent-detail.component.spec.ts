import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvAgentDetailComponent } from './crud-inv-agent-detail.component';

describe('CrudInvAgentDetailComponent', () => {
  let component: CrudInvAgentDetailComponent;
  let fixture: ComponentFixture<CrudInvAgentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvAgentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvAgentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
