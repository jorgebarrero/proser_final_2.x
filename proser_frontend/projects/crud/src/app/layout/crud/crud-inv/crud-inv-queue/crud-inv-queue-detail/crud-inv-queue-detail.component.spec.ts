import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvQueueDetailComponent } from './crud-inv-queue-detail.component';

describe('CrudInvQueueDetailComponent', () => {
  let component: CrudInvQueueDetailComponent;
  let fixture: ComponentFixture<CrudInvQueueDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvQueueDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvQueueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
