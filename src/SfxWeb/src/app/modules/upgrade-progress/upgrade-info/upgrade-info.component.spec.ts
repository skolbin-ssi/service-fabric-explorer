import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeInfoComponent } from './upgrade-info.component';

describe('UpgradeInfoComponent', () => {
  let component: UpgradeInfoComponent;
  let fixture: ComponentFixture<UpgradeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpgradeInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
