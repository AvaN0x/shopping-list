import {
  Component,
  computed,
  effect,
  inject,
  Input,
  OnDestroy,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ShoppingStoreCategory } from '../../../../services/shopping-stores.service.modele';
import { CdkDragDrop, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { ShoppingItemId } from '../../../../services/shopping-items.service.modele';
import { ShoppingListItemComponent } from '../item/shopping-list-item.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NULL_UUID } from '../../../../utils/uuid';
import { LongPressDirective } from '../../../../directives/long-press.directive';
import { JsonPipe } from '@angular/common';
import { ShoppingListItemAddComponent } from '../item/add/shopping-list-item-add.component';
import { SingleEditService } from '../../../../services/single-edit.service';
import { CreateItemParams } from '../../../../services/shopping-items.service';

export type CreateItemEvent = {
  categoryId: string;
  item: CreateItemParams;
};

@Component({
  selector: 'app-shopping-list-category',
  standalone: true,
  imports: [
    JsonPipe,
    ShoppingListItemComponent,
    ShoppingListItemAddComponent,
    CdkDropList,
    CdkDrag,
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    LongPressDirective,
  ],
  templateUrl: './shopping-list-category.component.html',
  styleUrl: './shopping-list-category.component.scss',
})
export class ShoppingListCategoryComponent implements OnDestroy {
  singleEditService = inject(SingleEditService);

  @Input({ required: true }) category!: ShoppingStoreCategory;
  @Input({ required: true }) categoriesLists!: CdkDropList[];

  readonly panelOpenState = signal(true);
  readonly hoveringDropList = signal(false);
  isNullUUID = computed(() => this.category.id === NULL_UUID);

  _dropList = viewChild<CdkDropList>('dropList');
  dropList(): CdkDropList {
    return this._dropList() as CdkDropList;
  }

  onDrop = output<CdkDragDrop<ShoppingItemId[]>>();
  drop(event: CdkDragDrop<ShoppingItemId[]>) {
    this.onDrop.emit(event);
  }

  cdkDropListEntered() {
    this.hoveringDropList.set(true);
  }
  cdkDropListExited() {
    this.hoveringDropList.set(false);
  }

  ngOnDestroy(): void {
    this.createItemSessionEffect.destroy();
  }

  // #region add item

  // #region edit mode
  /**
   * Has a value if the user is currently creating an item
   */
  createItemSessionId = signal<string | null>(null);

  private createItemSessionEffect = effect(() => {
    // With the current implementation, the user should not be able to edit multiple items at the same time
    // but we can add a check here to prevent that in case it happens

    // If we are in edit mode and the current editing item id is not the current item id
    if (
      this.createItemSessionId() &&
      this.singleEditService.currentEditId() !== this.createItemSessionId()
    ) {
      // Stop editing
      this.cancelCreateItem();
    }
  });

  add() {
    // Already in create mode
    if (this.createItemSessionId()) return;

    this.createItemSessionId.set(this.singleEditService.startEdit());
  }

  onCreateItem = output<CreateItemEvent>();
  createItem(label: string) {
    // Not in create mode
    if (!this.createItemSessionId()) return;

    this.onCreateItem.emit({
      categoryId: this.category.id,
      item: { label },
    });

    this.createItemSessionId.set(null);
  }
  cancelCreateItem() {
    // Not in create mode
    if (!this.createItemSessionId()) return;

    this.createItemSessionId.set(null);
  }
  // #endregion add item

  openMenu() {
    if (this.isNullUUID()) return;
    console.log('------------------------openMenu');
    // TODO
  }

  rename() {
    console.log('rename');
    // TODO
  }
  remove() {
    console.log('remove');
    // TODO
  }
}
