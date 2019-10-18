import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOutboundBreaksAuxiliarComponent } from './display-outbound-agents-BreaksResume-breaks.component';

describe('DisplayOutboundBreaksAuxiliarComponent', () => {
  let component: DisplayOutboundBreaksAuxiliarComponent;
  let fixture: ComponentFixture<DisplayOutboundBreaksAuxiliarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayOutboundBreaksAuxiliarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOutboundBreaksAuxiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
