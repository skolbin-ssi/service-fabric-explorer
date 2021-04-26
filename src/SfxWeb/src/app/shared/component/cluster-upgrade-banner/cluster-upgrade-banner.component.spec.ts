import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClusterUpgradeBannerComponent } from './cluster-upgrade-banner.component';

describe('ClusterUpgradeBannerComponent', () => {
  let component: ClusterUpgradeBannerComponent;
  let fixture: ComponentFixture<ClusterUpgradeBannerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterUpgradeBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterUpgradeBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
