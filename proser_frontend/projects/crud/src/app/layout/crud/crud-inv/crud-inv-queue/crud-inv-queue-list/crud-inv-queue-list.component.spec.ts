import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvQueueListComponent } from './crud-inv-queue-list.component';

describe('CrudInvQueueListComponent', () => {
  let component: CrudInvQueueListComponent;
  let fixture: ComponentFixture<CrudInvQueueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvQueueListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvQueueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
