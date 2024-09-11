import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalPanComponent } from './horizontal-pan.component';

describe('HorizontalPanComponent', () => {
  let component: HorizontalPanComponent;
  let fixture: ComponentFixture<HorizontalPanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalPanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalPanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
