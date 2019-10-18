import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInvCampaignListComponent } from './crud-inv-campaign-list.component';

describe('CrudInvCampaignListComponent', () => {
  let component: CrudInvCampaignListComponent;
  let fixture: ComponentFixture<CrudInvCampaignListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudInvCampaignListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudInvCampaignListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
