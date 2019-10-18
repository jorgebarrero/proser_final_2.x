import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInboundBreaksAuxiliarComponent } from './display-inbound-agents-BreaksResume-breaks.component';

describe('DisplayInboundBreaksAuxiliarComponent', () => {
  let component: DisplayInboundBreaksAuxiliarComponent;
  let fixture: ComponentFixture<DisplayInboundBreaksAuxiliarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayInboundBreaksAuxiliarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInboundBreaksAuxiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
