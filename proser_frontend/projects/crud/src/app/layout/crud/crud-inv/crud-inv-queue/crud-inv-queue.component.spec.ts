import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvQueueComponent } from './crud-inv-queue.component';

describe('CrudInvQueueComponent', () => {
  let component: CrudInvQueueComponent;
  let fixture: ComponentFixture<CrudInvQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
