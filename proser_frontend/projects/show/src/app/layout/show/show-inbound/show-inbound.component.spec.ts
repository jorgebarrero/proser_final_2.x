import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInboundComponent } from './show-inbound.component';

describe('ShowInboundComponent', () => {
  let component: ShowInboundComponent;
  let fixture: ComponentFixture<ShowInboundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowInboundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowInboundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
