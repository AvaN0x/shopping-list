import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalPanActionComponent } from './horizontal-pan-action.component';

describe('HorizontalPanActionComponent', () => {
  let component: HorizontalPanActionComponent;
  let fixture: ComponentFixture<HorizontalPanActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalPanActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalPanActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
