import { Injectable, signal } from '@angular/core';
import {
  ShoppingItem,
  ShoppingItemSchema,
  ShoppingItemsRecord,
  ShoppingItemsSchema,
} from './shopping-items.service.modele';
import { Storageable } from './storage.service.types';
import { uuid } from '../utils/uuid';

export type CreateItemParams = Omit<ShoppingItem, 'id' | 'quantity'>;

@Injectable({
  providedIn: 'root',
})
export class ShoppingItemsService implements Storageable {
  items = signal<ShoppingItemsRecord>({});

  /**
   * Create a new item
   * @param item The item to create
   * @returns The id of the created item
   * @throws If the item is invalid
   */
  createItem(item: CreateItemParams): string {
    const id = uuid();
    const _item = ShoppingItemSchema.parse({ ...item, id, quantity: 1 });

    this.items.update((items) => ({ ...items, [id]: _item }));
    return id;
  }

  populate(data: string): void {
    const items = ShoppingItemsSchema.parse(JSON.parse(data));
    this.items.update(() =>
      Object.fromEntries(items.map((item) => [item.id, item]))
    );
  }

  serialize(): string {
    return JSON.stringify(Object.values(this.items()));
  }
}
