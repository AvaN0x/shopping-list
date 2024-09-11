import { Component, computed, inject, Input, Signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  ShoppingItem,
  ShoppingItemId,
} from '../../../../services/shopping-items.service.modele';
import { ShoppingItemsService } from '../../../../services/shopping-items.service';
import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LongPressDirective } from '../../../../directives/long-press.directive';
import { HorizontalPanModule } from '../../../../modules/horizontal-pan/horizontal-pan.module';

@Component({
  selector: 'app-shopping-list-item',
  standalone: true,
  imports: [
    JsonPipe,
    CdkDragHandle,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    LongPressDirective,
    HorizontalPanModule,
  ],
  templateUrl: './shopping-list-item.component.html',
  styleUrl: './shopping-list-item.component.scss',
  host: {
    '[class.no-quantity]': 'itemData()?.quantity <= 0',
  },
})
export class ShoppingListItemComponent {
  itemsService = inject(ShoppingItemsService);

  @Input({ required: true }) itemId!: ShoppingItemId;
  itemData: Signal<ShoppingItem | undefined> = computed(
    () => this.itemsService.items()[this.itemId]
  );
  updateItem(item: ShoppingItem) {
    const itemData = this.itemData();
    if (!itemData || itemData.id !== item.id) {
      throw new Error(`Item with id ${item.id} is not the current item`);
    }
    this.itemsService.items.update((items) => {
      items[item.id] = { ...item };
      return { ...items };
    });
  }

  openMenu() {
    console.log('------------------------openMenu item');
    // TODO
  }

  increment() {
    const itemData = this.itemData();
    if (!itemData) {
      return;
    }
    this.updateItem({ ...itemData, quantity: itemData.quantity + 1 });
  }
  decrement() {
    const itemData = this.itemData();
    if (!itemData || itemData.quantity <= 0) {
      return;
    }
    this.updateItem({
      ...itemData,
      quantity: itemData.quantity - 1,
    });
  }
  rename() {
    console.log('rename', this.itemData()?.id);
  }
  remove() {
    console.log('remove', this.itemData()?.id);
  }
}
