import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudUserbaseHeaderComponent } from './crud-userbase-header.component';

describe('CrudUserbaseHeaderComponent', () => {
  let component: CrudUserbaseHeaderComponent;
  let fixture: ComponentFixture<CrudUserbaseHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudUserbaseHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudUserbaseHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
