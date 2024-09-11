import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalPanItemComponent } from './horizontal-pan-item.component';

describe('HorizontalPanItemComponent', () => {
  let component: HorizontalPanItemComponent;
  let fixture: ComponentFixture<HorizontalPanItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalPanItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalPanItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
