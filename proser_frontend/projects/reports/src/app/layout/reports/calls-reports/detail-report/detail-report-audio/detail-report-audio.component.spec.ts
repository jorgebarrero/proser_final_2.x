import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailReportAudioComponent } from './detail-report-audio.component';

describe('DetailReportAudioComponent', () => {
  let component: DetailReportAudioComponent;
  let fixture: ComponentFixture<DetailReportAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailReportAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailReportAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
