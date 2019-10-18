import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvCampaignComponent } from './crud-inv-campaign.component';

describe('CrudInvCampaignComponent', () => {
  let component: CrudInvCampaignComponent;
  let fixture: ComponentFixture<CrudInvCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
