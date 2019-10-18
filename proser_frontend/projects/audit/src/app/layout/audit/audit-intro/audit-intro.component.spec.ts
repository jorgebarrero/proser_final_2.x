import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditIntroComponent } from './audit-intro.component';

describe('AuditIntroComponent', () => {
  let component: AuditIntroComponent;
  let fixture: ComponentFixture<AuditIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
