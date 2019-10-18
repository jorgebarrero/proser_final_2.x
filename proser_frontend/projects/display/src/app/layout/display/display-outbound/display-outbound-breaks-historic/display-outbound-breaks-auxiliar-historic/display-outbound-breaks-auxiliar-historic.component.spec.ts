import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOutboundBreaksAuxiliarHistoricComponent } from './display-outbound-breaks-auxiliar-historic.component';

describe('DisplayOutboundBreaksAuxiliarHistoricComponent', () => {
  let component: DisplayOutboundBreaksAuxiliarHistoricComponent;
  let fixture: ComponentFixture<DisplayOutboundBreaksAuxiliarHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayOutboundBreaksAuxiliarHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayOutboundBreaksAuxiliarHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
