import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudShowDisplayComponent } from './crud-show-display.component';

describe('CrudShowDisplayComponent', () => {
  let component: CrudShowDisplayComponent;
  let fixture: ComponentFixture<CrudShowDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudShowDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudShowDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
