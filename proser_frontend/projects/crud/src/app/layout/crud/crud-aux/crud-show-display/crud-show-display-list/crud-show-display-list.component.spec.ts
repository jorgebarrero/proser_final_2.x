import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudShowDisplayListComponent } from './crud-show-display-list.component';

describe('CrudShowDisplayListComponent', () => {
  let component: CrudShowDisplayListComponent;
  let fixture: ComponentFixture<CrudShowDisplayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudShowDisplayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudShowDisplayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
