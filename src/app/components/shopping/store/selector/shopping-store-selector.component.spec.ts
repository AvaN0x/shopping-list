import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingStoreSelectorComponent } from './shopping-store-selector.component';

describe('ShoppingStoreSelectorComponent', () => {
  let component: ShoppingStoreSelectorComponent;
  let fixture: ComponentFixture<ShoppingStoreSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingStoreSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingStoreSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
