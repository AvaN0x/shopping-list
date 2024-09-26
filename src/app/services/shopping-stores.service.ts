import { computed, Injectable, signal } from '@angular/core';
import {
  ShoppingStore,
  ShoppingStoreCategory,
  ShoppingStoreCategorySchema,
  ShoppingStores,
  ShoppingStoreSchema,
  ShoppingStoresSchema,
} from './shopping-stores.service.modele';
import { Storageable } from './storage.service.types';
import { NULL_UUID, uuid } from '../utils/uuid';

export type CreateStoreParams = Omit<ShoppingStore, 'id' | 'categories'>;
export type CreateStoreCategoryParams = Omit<ShoppingStoreCategory, 'id'>;

@Injectable({
  providedIn: 'root',
})
export class ShoppingStoresService implements Storageable {
  readonly storageName = 'shopping-stores';

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
  addStore(store: CreateStoreParams, duplicateId?: ShoppingStore['id']) {
    const id = uuid();
    const categories = [];
    // If we want to duplicate a store, we copy its categories
    if (duplicateId && duplicateId !== NULL_UUID) {
      const duplicateStore = this.stores().find((s) => s.id === duplicateId);
      if (duplicateStore) {
        categories.push(
          ...duplicateStore.categories.map(({ id: _id, itemsIds, ...c }) => ({
            id: uuid(),
            itemsIds: [...itemsIds],
            ...c,
          }))
        );
      }
    }

    const _store = ShoppingStoreSchema.parse({ ...store, id, categories });
    this.stores.update((stores) => [...stores, _store]);
    return id;
  }

  // #region current store categories
  /**
   * Add a new category to the current store
   * @param category The category to create
   * @returns The id of the created category
   * @throws If the category is invalid
   */
  addCurrentStoreCategory(category: CreateStoreCategoryParams) {
    const currentStore = this.currentStore();
    if (!currentStore) {
      throw new Error(`Current store does not exist`);
    }

    const id = uuid();
    const _category = ShoppingStoreCategorySchema.parse({ id, ...category });
    this.updateCurrentStore({
      ...currentStore,
      categories: [...currentStore.categories, _category],
    });
    return id;
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

  serialize = computed<string>(() => JSON.stringify(this.stores()));
}
