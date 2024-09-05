import { Injectable, signal } from '@angular/core';
import {
  ShoppingItemsRecord,
  ShoppingItemsSchema,
} from './shopping-items.service.modele';
import { Storageable } from './storage.service.types';

@Injectable({
  providedIn: 'root',
})
export class ShoppingItemsService implements Storageable {
  items = signal<ShoppingItemsRecord>({});

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
