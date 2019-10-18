import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentBreaksReportListComponent } from './current-breaks-report-list.component';

describe('CurrentBreaksReportListComponent', () => {
  let component: CurrentBreaksReportListComponent;
  let fixture: ComponentFixture<CurrentBreaksReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentBreaksReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentBreaksReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
