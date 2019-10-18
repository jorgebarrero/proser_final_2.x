import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuAgentsComponent } from './header-menu-agents.component';

describe('HeaderMenuAgentsComponent', () => {
  let component: HeaderMenuAgentsComponent;
  let fixture: ComponentFixture<HeaderMenuAgentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMenuAgentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
