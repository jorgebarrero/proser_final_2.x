import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudShowDisplayDetailComponent } from './crud-show-display-detail.component';

describe('CrudShowDisplayDetailComponent', () => {
  let component: CrudShowDisplayDetailComponent;
  let fixture: ComponentFixture<CrudShowDisplayDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudShowDisplayDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudShowDisplayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
