import { Injectable, signal } from '@angular/core';
import {
  ShoppingStores,
  ShoppingStoresSchema,
} from './shopping-stores.service.modele';
import { Storageable } from './storage.service.types';

@Injectable({
  providedIn: 'root',
})
export class ShoppingStoresService implements Storageable {
  stores = signal<ShoppingStores>([]);

  populate(data: string): void {
    const stores = ShoppingStoresSchema.parse(JSON.parse(data));
    this.stores.update(() => stores);
  }

  serialize(): string {
    return JSON.stringify(this.stores());
  }
}
