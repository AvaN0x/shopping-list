import { Component, computed, inject, Input, Signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  ShoppingItem,
  ShoppingItemId,
} from '../../../../services/shopping-items.service.modele';
import { ShoppingItemsService } from '../../../../services/shopping-items.service';

@Component({
  selector: 'app-shopping-list-item',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './shopping-list-item.component.html',
  styleUrl: './shopping-list-item.component.scss',
})
export class ShoppingListItemComponent {
  itemsService = inject(ShoppingItemsService);

  @Input({ required: true }) itemId!: ShoppingItemId;
  itemData: Signal<ShoppingItem | undefined> = computed(
    () => this.itemsService.items()[this.itemId]
  );
}
