import { effect, inject, Injectable, OnDestroy } from '@angular/core';
import { ShoppingItemsService } from './shopping-items.service';
import { ShoppingStoresService } from './shopping-stores.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService implements OnDestroy {
  itemsService = inject(ShoppingItemsService);
  storesService = inject(ShoppingStoresService);
  private services = [this.itemsService, this.storesService];

  constructor() {
    // Try to populate the storage
    try {
      this.populate();
    } catch (error) {
      console.error('Error while populating the storage', error);
    }
  }

  populate() {
    for (const service of this.services) {
      const data = localStorage.getItem(service.storageName);
      if (data) {
        service.populate(data);
      }
    }
  }

  ngOnDestroy(): void {
    this.saveServicesEffect.destroy();
  }

  private saveServicesEffect = effect(() => {
    this.save();
  });

  save() {
    for (const service of this.services) {
      console.log('save', service.storageName);
      localStorage.setItem(service.storageName, service.serialize());
    }
  }
}
