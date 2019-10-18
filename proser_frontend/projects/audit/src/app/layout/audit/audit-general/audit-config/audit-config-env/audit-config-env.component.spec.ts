import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditConfigEnvComponent } from './audit-config-env.component';

describe('AuditConfigEnvComponent', () => {
  let component: AuditConfigEnvComponent;
  let fixture: ComponentFixture<AuditConfigEnvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditConfigEnvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditConfigEnvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
