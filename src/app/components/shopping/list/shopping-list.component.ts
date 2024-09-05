import {
  Component,
  computed,
  inject,
  Signal,
  viewChildren,
} from '@angular/core';
import { ShoppingItemsService } from '../../../services/shopping-items.service';
import { ShoppingStoresService } from '../../../services/shopping-stores.service';
import { JsonPipe } from '@angular/common';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { ShoppingStore } from '../../../services/shopping-stores.service.modele';
import { ShoppingListItemComponent } from './item/shopping-list-item.component';
import {
  ShoppingItemId,
  ShoppingItems,
} from '../../../services/shopping-items.service.modele';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [JsonPipe, CdkDropList, CdkDrag, ShoppingListItemComponent],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss',
})
export class ShoppingListComponent {
  itemsService = inject(ShoppingItemsService);
  storesService = inject(ShoppingStoresService);

  store: ShoppingStore;

  _categoriesLists = viewChildren<CdkDropList>('categoryList');

  constructor() {
    this.store = this.storesService.stores()[0];
  }

  categoriesLists(): CdkDropList[] {
    return this._categoriesLists() as CdkDropList[];
  }

  drop(event: CdkDragDrop<ShoppingItemId[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
