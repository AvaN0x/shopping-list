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
import { HorizontalPanDirective } from '../../../../directives/horizontal-pan.directive';

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
    HorizontalPanDirective,
  ],
  templateUrl: './shopping-list-item.component.html',
  styleUrl: './shopping-list-item.component.scss',
})
export class ShoppingListItemComponent {
  itemsService = inject(ShoppingItemsService);

  @Input({ required: true }) itemId!: ShoppingItemId;
  itemData: Signal<ShoppingItem | undefined> = computed(
    () => this.itemsService.items()[this.itemId]
  );

  openMenu() {
    console.log('------------------------openMenu item');
    // TODO
  }

  increment() {
    console.log('increment', this.itemData()?.id);
  }
  decrement() {
    console.log('decrement', this.itemData()?.id);
  }
  rename() {
    console.log('rename', this.itemData()?.id);
  }
  remove() {
    console.log('remove', this.itemData()?.id);
  }
}
