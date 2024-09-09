import { inject, Injectable } from '@angular/core';
import { ShoppingItemsService } from './shopping-items.service';
import { ShoppingStoresService } from './shopping-stores.service';
import { ShoppingItems } from './shopping-items.service.modele';
import { ShoppingStores } from './shopping-stores.service.modele';
import { uuid } from '../utils/uuid';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  itemsService = inject(ShoppingItemsService);
  storesService = inject(ShoppingStoresService);

  constructor() {
    try {
      this.populate();
    } catch (error) {
      console.error('Error while populating the storage', error);
    }
  }

  populate() {
    const item1Uuid = uuid();
    const item2Uuid = uuid();
    this.itemsService.populate(
      JSON.stringify([
        { id: item1Uuid, label: 'Item 1', quantity: 2 },
        { id: item2Uuid, label: 'Item 2', quantity: 0 },
        { id: uuid(), label: 'Item 3', quantity: 1 },
        { id: uuid(), label: 'Item 4', quantity: 0 },
        { id: uuid(), label: 'Item 5', quantity: 0 },
      ] satisfies ShoppingItems)
    );
    this.storesService.populate(
      JSON.stringify([
        {
          id: uuid(),
          label: 'Store 1',
          categories: [
            {
              id: uuid(),
              label: 'Category 1',
              itemsIds: [item1Uuid],
            },
            {
              id: uuid(),
              label: 'Category 2',
              itemsIds: [item2Uuid],
            },
            {
              id: uuid(),
              label: 'Category 3',
              itemsIds: [],
            },
          ],
        },
        {
          id: uuid(),
          label: 'Store 2',
          categories: [],
        },
      ] satisfies ShoppingStores)
    );
  }

  save() {
    // TODO: Implement this method
    console.log('StorageService save');
  }
}
