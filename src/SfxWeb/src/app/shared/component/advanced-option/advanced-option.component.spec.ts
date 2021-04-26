import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdvancedOptionComponent } from './advanced-option.component';

describe('AdvancedOptionComponent', () => {
  let component: AdvancedOptionComponent;
  let fixture: ComponentFixture<AdvancedOptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
