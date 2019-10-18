import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFinderComponent } from './report-finder.component';

describe('ReportFinderComponent', () => {
  let component: ReportFinderComponent;
  let fixture: ComponentFixture<ReportFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
