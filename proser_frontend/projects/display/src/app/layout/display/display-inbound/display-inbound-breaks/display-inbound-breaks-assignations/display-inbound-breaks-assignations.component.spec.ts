import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInboundBreaksAssignationsComponent } from './display-inbound-agents-agentsAuxiliarResume-assignations.component';

describe('DisplayInboundBreaksAssignationsComponent', () => {
  let component: DisplayInboundBreaksAssignationsComponent;
  let fixture: ComponentFixture<DisplayInboundBreaksAssignationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayInboundBreaksAssignationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInboundBreaksAssignationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
