import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditHeaderComponent } from './audit-header.component';

describe('AuditHeaderComponent', () => {
  let component: AuditHeaderComponent;
  let fixture: ComponentFixture<AuditHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
