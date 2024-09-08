import {
  Component,
  computed,
  Input,
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

@Component({
  selector: 'app-shopping-list-category',
  standalone: true,
  imports: [
    JsonPipe,
    ShoppingListItemComponent,
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
export class ShoppingListCategoryComponent {
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
    console.log('cdkDropListEntered');
  }
  cdkDropListExited() {
    console.log('cdkDropListExited');
  }

  openMenu() {
    if (this.isNullUUID()) return;
    console.log('------------------------openMenu');
    // TODO
  }

  add() {
    console.log('add');
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
