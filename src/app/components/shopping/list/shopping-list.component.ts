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

  store = computed<ShoppingStore | undefined>(() =>
    this.storesService.currentStore()
  );
  unsortedCategory: Signal<ShoppingStoreCategory | undefined> = computed(() => {
    const store = this.store();
    if (!store) {
      return undefined;
    }

    // Go through the store categories and items to find the items that are not in any category
    const allItemsIds = Object.keys(this.itemsService.items());
    const itemsInCategories = store.categories.flatMap(
      (category) => category.itemsIds
    );
    const itemsIds = allItemsIds.filter(
      (itemId) => !itemsInCategories.includes(itemId)
    );

    return {
      id: NULL_UUID,
      label: 'Non triés',
      itemsIds,
    };
  });

  _categoriesLists =
    viewChildren<ShoppingListCategoryComponent>('categoryList');
  categoriesLists(): CdkDropList[] {
    return this._categoriesLists().map((categoryList) =>
      categoryList.dropList()
    );
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

    // The stores array are correctly updated from moveItemInArray and transferArrayItem functions
    // but they do not trigger a reload of the signal, we update it manually
    const store = this.store();
    if (store) {
      this.storesService.updateCurrentStore(store);
    }
  }
}
