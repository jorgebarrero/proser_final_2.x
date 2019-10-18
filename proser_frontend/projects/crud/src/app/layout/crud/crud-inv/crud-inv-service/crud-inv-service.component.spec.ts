import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvServiceComponent } from './crud-inv-service.component';

describe('CrudInvServiceComponent', () => {
  let component: CrudInvServiceComponent;
  let fixture: ComponentFixture<CrudInvServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
