import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  HorizontalPanActionLeftComponent,
  HorizontalPanActionRightComponent,
} from './horizontal-pan-action.component';

describe('HorizontalPanActionLeftComponent', () => {
  let component: HorizontalPanActionLeftComponent;
  let fixture: ComponentFixture<HorizontalPanActionLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalPanActionLeftComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HorizontalPanActionLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('HorizontalPanActionRightComponent', () => {
  let component: HorizontalPanActionRightComponent;
  let fixture: ComponentFixture<HorizontalPanActionRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalPanActionRightComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HorizontalPanActionRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
