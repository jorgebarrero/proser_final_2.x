import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudUserbaseHeaderButtonsComponent } from './crud-userbase-header-buttons.component';

describe('CrudUserbaseHeaderButtonsComponent', () => {
  let component: CrudUserbaseHeaderButtonsComponent;
  let fixture: ComponentFixture<CrudUserbaseHeaderButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudUserbaseHeaderButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudUserbaseHeaderButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
