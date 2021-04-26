import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HealthBadgeComponent } from './health-badge.component';

describe('HealthBadgeComponent', () => {
  let component: HealthBadgeComponent;
  let fixture: ComponentFixture<HealthBadgeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
