import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFinderComponent } from './dashboard-finder.component';

describe('DashboardFinderComponent', () => {
  let component: DashboardFinderComponent;
  let fixture: ComponentFixture<DashboardFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
