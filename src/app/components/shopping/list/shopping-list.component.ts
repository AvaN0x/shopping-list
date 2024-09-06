import {
  Component,
  computed,
  inject,
  Signal,
  viewChildren,
} from '@angular/core';
import { ShoppingItemsService } from '../../../services/shopping-items.service';
import { ShoppingStoresService } from '../../../services/shopping-stores.service';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import type { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import {
  ShoppingStore,
  ShoppingStoreCategory,
} from '../../../services/shopping-stores.service.modele';
import { ShoppingItemId } from '../../../services/shopping-items.service.modele';
import { ShoppingListCategoryComponent } from './category/shopping-list-category.component';
import { NULL_UUID } from '../../../utils/uuid';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [ShoppingListCategoryComponent],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss',
})
export class ShoppingListComponent {
  itemsService = inject(ShoppingItemsService);
  storesService = inject(ShoppingStoresService);

  store: ShoppingStore;
  unsortedCategory: Signal<ShoppingStoreCategory> = computed(() => {
    const itemsIds = Object.keys(this.itemsService.items());

    // Go through the store categories and items to find the items that are not in any category
    const itemsInCategories = this.store.categories.flatMap(
      (category) => category.itemsIds
    );

    return {
      id: NULL_UUID,
      label: 'Non triés',
      itemsIds: itemsIds.filter(
        (itemId) => !itemsInCategories.includes(itemId)
      ),
    };
  });

  _categoriesLists =
    viewChildren<ShoppingListCategoryComponent>('categoryList');
  categoriesLists(): CdkDropList[] {
    return this._categoriesLists().map((categoryList) =>
      categoryList.dropList()
    );
  }

  constructor() {
    this.store = this.storesService.stores()[0];
  }

  drop(event: CdkDragDrop<ShoppingItemId[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
