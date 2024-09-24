import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListCategoryAddComponent } from './shopping-list-category-add.component';

describe('ShoppingListCategoryAddComponent', () => {
  let component: ShoppingListCategoryAddComponent;
  let fixture: ComponentFixture<ShoppingListCategoryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingListCategoryAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingListCategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
