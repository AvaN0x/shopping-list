import {
  Component,
  computed,
  effect,
  inject,
  Input,
  OnDestroy,
  signal,
  Signal,
} from '@angular/core';
import {
  ShoppingItem,
  ShoppingItemId,
} from '../../../../services/shopping-items.service.modele';
import { ShoppingItemsService } from '../../../../services/shopping-items.service';
import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LongPressDirective } from '../../../../directives/long-press.directive';
import { HorizontalPanModule } from '../../../../modules/horizontal-pan/horizontal-pan.module';
import { SeamlessInputTextComponent } from '../../../seamless-input-text/seamless-input-text.component';
import { SingleEditService } from '../../../../services/single-edit.service';

@Component({
  selector: 'app-shopping-list-item',
  standalone: true,
  imports: [
    CdkDragHandle,
    MatIconModule,
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
export class ShoppingListItemComponent implements OnDestroy {
  itemsService = inject(ShoppingItemsService);
  singleEditService = inject(SingleEditService);

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

  ngOnDestroy(): void {
    this.editSessionEffect.destroy();
  }

  // #region edit mode
  editLabel = signal<string>('');
  editSessionId = signal<string | null>(null);
  editMode = signal<boolean>(false);

  private editSessionEffect = effect(() => {
    // With the current implementation, the user should not be able to edit multiple items at the same time
    // but we can add a check here to prevent that in case it happens

    // If we are in edit mode and the current editing item id is not the current item id
    if (
      this.editMode() &&
      this.singleEditService.currentEditId() !== this.editSessionId()
    ) {
      // Stop editing
      this.stopEdit();
    }
  });

  startEdit() {
    // Already in edit mode
    if (this.editMode()) return;

    const itemData = this.itemData();
    // Can't edit if there is no item
    if (!itemData) return;

    this.editSessionId.set(this.singleEditService.startEdit());
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

    // TODO: if the new label is empty we should remove the item with not confirmation

    // Wait for the blur event to be processed
    setTimeout(() => {
      this.editSessionId.set(null);
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
