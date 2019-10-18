import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAgentsReportComponent } from './current-agents-report.component';

describe('CurrentAgentsReportComponent', () => {
  let component: CurrentAgentsReportComponent;
  let fixture: ComponentFixture<CurrentAgentsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentAgentsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentAgentsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
