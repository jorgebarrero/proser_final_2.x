import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvCampaignDetailComponent } from './crud-inv-campaign-detail.component';

describe('CrudInvCampaignDetailComponent', () => {
  let component: CrudInvCampaignDetailComponent;
  let fixture: ComponentFixture<CrudInvCampaignDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvCampaignDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvCampaignDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
