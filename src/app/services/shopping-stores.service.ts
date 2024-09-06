import { computed, Injectable, signal } from '@angular/core';
import {
  ShoppingStore,
  ShoppingStores,
  ShoppingStoresSchema,
} from './shopping-stores.service.modele';
import { Storageable } from './storage.service.types';

@Injectable({
  providedIn: 'root',
})
export class ShoppingStoresService implements Storageable {
  stores = signal<ShoppingStores>([]);
  private currentStoreIndex = signal(0);

  currentStore = computed<ShoppingStore | undefined>(
    () => this.stores()[this.currentStoreIndex()] ?? this.stores()[0]
  );

  setCurrentStore(id: ShoppingStore['id']) {
    const index = this.stores().findIndex((store) => store.id === id);
    if (index === -1) {
      throw new Error(`Store with id ${id} not found`);
    }
    this.currentStoreIndex.update(() => index);
  }

  populate(data: string): void {
    const stores = ShoppingStoresSchema.parse(JSON.parse(data));
    this.stores.update(() => stores);
  }

  serialize(): string {
    return JSON.stringify(this.stores());
  }
}
