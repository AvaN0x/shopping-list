import { inject, Injectable } from '@angular/core';
import { ShoppingItemsService } from './shopping-items.service';
import { ShoppingStoresService } from './shopping-stores.service';
import { ShoppingItems } from './shopping-items.service.modele';
import { ShoppingStores } from './shopping-stores.service.modele';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  itemsService = inject(ShoppingItemsService);
  storesService = inject(ShoppingStoresService);

  constructor() {
    this.populate();
  }

  populate() {
    const item1Uuid = crypto.randomUUID();
    const item2Uuid = crypto.randomUUID();
    this.itemsService.populate(
      JSON.stringify([
        { id: item1Uuid, label: 'Item 1' },
        { id: item2Uuid, label: 'Item 2' },
        { id: crypto.randomUUID(), label: 'Item 3' },
      ] satisfies ShoppingItems)
    );
    this.storesService.populate(
      JSON.stringify([
        {
          id: crypto.randomUUID(),
          label: 'Store 1',
          categories: [
            {
              id: crypto.randomUUID(),
              label: 'Category 1',
              itemsIds: [item1Uuid],
            },
            {
              id: crypto.randomUUID(),
              label: 'Category 2',
              itemsIds: [item2Uuid],
            },
            {
              id: crypto.randomUUID(),
              label: 'Category 3',
              itemsIds: [],
            },
          ],
        },
      ] satisfies ShoppingStores)
    );
  }

  save() {
    // TODO: Implement this method
    console.log('StorageService save');
  }
}
