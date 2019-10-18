import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentBreaksReportComponent } from './current-breaks-report.component';

describe('CurrentBreaksReportComponent', () => {
  let component: CurrentBreaksReportComponent;
  let fixture: ComponentFixture<CurrentBreaksReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentBreaksReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentBreaksReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
