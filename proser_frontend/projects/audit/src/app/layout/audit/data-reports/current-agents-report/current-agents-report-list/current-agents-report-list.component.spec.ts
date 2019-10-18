import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAgentsReportListComponent } from './current-agents-report-list.component';

describe('CurrentAgentsReportListComponent', () => {
  let component: CurrentAgentsReportListComponent;
  let fixture: ComponentFixture<CurrentAgentsReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentAgentsReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentAgentsReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
