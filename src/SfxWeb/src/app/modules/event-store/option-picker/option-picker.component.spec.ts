import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionPickerComponent } from './option-picker.component';

describe('OptionPickerComponent', () => {
  let component: OptionPickerComponent;
  let fixture: ComponentFixture<OptionPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
