import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOutboundBreaksAssignationsComponent } from './display-outbound-agents-agentsAuxiliarResume-assignations.component';

describe('DisplayOutboundBreaksAssignationsComponent', () => {
  let component: DisplayOutboundBreaksAssignationsComponent;
  let fixture: ComponentFixture<DisplayOutboundBreaksAssignationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayOutboundBreaksAssignationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOutboundBreaksAssignationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
