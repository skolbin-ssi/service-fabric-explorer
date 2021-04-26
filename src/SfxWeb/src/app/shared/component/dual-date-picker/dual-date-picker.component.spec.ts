import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DualDatePickerComponent } from './dual-date-picker.component';

describe('DualDatePickerComponent', () => {
  let component: DualDatePickerComponent;
  let fixture: ComponentFixture<DualDatePickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DualDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DualDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
