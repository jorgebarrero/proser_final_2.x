import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuSectionsComponent } from './header-menu-sections.component';

describe('HeaderMenuSectionsComponent', () => {
  let component: HeaderMenuSectionsComponent;
  let fixture: ComponentFixture<HeaderMenuSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMenuSectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMenuSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
