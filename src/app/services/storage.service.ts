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
    this.populate();
  }

  populate() {
    const item1Uuid = uuid();
    const item2Uuid = uuid();
    this.itemsService.populate(
      JSON.stringify([
        { id: item1Uuid, label: 'Item 1' },
        { id: item2Uuid, label: 'Item 2' },
        { id: uuid(), label: 'Item 3' },
        { id: uuid(), label: 'Item 4' },
        { id: uuid(), label: 'Item 5' },
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
      ] satisfies ShoppingStores)
    );
  }

  save() {
    // TODO: Implement this method
    console.log('StorageService save');
  }
}
