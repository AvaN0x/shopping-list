import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingStoreAddComponent } from './shopping-store-add.component';

describe('ShoppingStoreAddComponent', () => {
  let component: ShoppingStoreAddComponent;
  let fixture: ComponentFixture<ShoppingStoreAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingStoreAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingStoreAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
