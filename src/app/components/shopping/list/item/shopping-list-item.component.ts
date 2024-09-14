import {
  Component,
  computed,
  inject,
  Input,
  signal,
  Signal,
} from '@angular/core';
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
import { SeamlessInputTextComponent } from '../../../seamless-input-text/seamless-input-text.component';

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
    SeamlessInputTextComponent,
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

  // #region edit mode
  editLabel = signal<string>('');
  editMode = signal<boolean>(false);

  startEdit() {
    // Already in edit mode
    if (this.editMode()) return;

    const itemData = this.itemData();
    // Can't edit if there is no item
    if (!itemData) return;

    this.editLabel.set(itemData.label);
    this.editMode.set(true);
  }
  editLabelChange(value: string) {
    const itemData = this.itemData();
    if (!itemData) {
      return;
    }
    this.updateItem({ ...itemData, label: value });
  }
  stopEdit() {
    // Not in edit mode
    if (!this.editMode()) return;

    // Wait for the blur event to be processed
    setTimeout(() => {
      this.editLabel.set('');
      this.editMode.set(false);
    }, 0);
  }
  // #endregion edit mode

  // #region actions
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
  remove() {
    console.log('remove', this.itemData()?.id);
    // TODO confirmation
  }
  // #endregion actions
}
