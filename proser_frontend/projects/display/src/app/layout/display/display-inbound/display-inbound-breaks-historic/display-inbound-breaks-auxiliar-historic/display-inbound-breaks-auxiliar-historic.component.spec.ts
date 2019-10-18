import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInboundBreaksAuxiliarHistoricComponent } from './display-inbound-breaks-auxiliar-historic.component';

describe('DisplayInboundBreaksAuxiliarHistoricComponent', () => {
  let component: DisplayInboundBreaksAuxiliarHistoricComponent;
  let fixture: ComponentFixture<DisplayInboundBreaksAuxiliarHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayInboundBreaksAuxiliarHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInboundBreaksAuxiliarHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
