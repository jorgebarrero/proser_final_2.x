import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductivityReportListComponent } from './productivity-report-list.component';

describe('ProductivityReportListComponent', () => {
  let component: ProductivityReportListComponent;
  let fixture: ComponentFixture<ProductivityReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductivityReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductivityReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
