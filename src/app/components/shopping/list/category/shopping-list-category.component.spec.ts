import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListCategoryComponent } from './shopping-list-category.component';

describe('ShoppingListCategoryComponent', () => {
  let component: ShoppingListCategoryComponent;
  let fixture: ComponentFixture<ShoppingListCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingListCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingListCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
