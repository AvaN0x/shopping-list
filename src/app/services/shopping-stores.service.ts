import { computed, Injectable, signal } from '@angular/core';
import {
  ShoppingStore,
  ShoppingStoreCategory,
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
  // #region current store
  updateCurrentStore(store: ShoppingStore) {
    const currentStore = this.currentStore();
    if (!currentStore || currentStore.id !== store.id) {
      throw new Error(`Store with id ${store.id} is not the current store`);
    }
    this.stores.update((stores) => {
      stores[this.currentStoreIndex()] = { ...store };
      return [...stores];
    });
  }

  // #region current store categories
  addCurrentStoreCategory(category: ShoppingStoreCategory) {
    const currentStore = this.currentStore();
    if (!currentStore) {
      throw new Error(`Current store does not exist`);
    }

    this.updateCurrentStore({
      ...currentStore,
      categories: [...currentStore.categories, { ...category }],
    });
  }
  updateCurrentStoreCategory(category: ShoppingStoreCategory) {
    const currentStore = this.currentStore();
    if (!currentStore) {
      throw new Error(`Current store does not exist`);
    }
    const index = currentStore.categories.findIndex(
      (c) => c.id === category.id
    );
    if (index === -1) {
      throw new Error(
        `Category with id ${category.id} not found in current store`
      );
    }

    this.updateCurrentStore({
      ...currentStore,
      categories: [
        ...currentStore.categories.slice(0, index),
        { ...category },
        ...currentStore.categories.slice(index + 1),
      ],
    });
  }
  removeCurrentStoreCategory(categoryId: ShoppingStoreCategory['id']) {
    const currentStore = this.currentStore();
    if (!currentStore) {
      throw new Error(`Current store does not exist`);
    }
    const index = currentStore.categories.findIndex((c) => c.id === categoryId);
    if (index === -1) {
      throw new Error(
        `Category with id ${categoryId} not found in current store`
      );
    }

    this.updateCurrentStore({
      ...currentStore,
      categories: [
        ...currentStore.categories.slice(0, index),
        ...currentStore.categories.slice(index + 1),
      ],
    });
  }
  // #endregion current store categories
  // #endregion current store

  populate(data: string): void {
    const stores = ShoppingStoresSchema.parse(JSON.parse(data));
    this.stores.update(() => stores);
  }

  serialize(): string {
    return JSON.stringify(this.stores());
  }
}
