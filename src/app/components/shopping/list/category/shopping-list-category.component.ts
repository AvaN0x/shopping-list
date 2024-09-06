import {
  booleanAttribute,
  Component,
  Input,
  output,
  viewChild,
} from '@angular/core';
import { ShoppingStoreCategory } from '../../../../services/shopping-stores.service.modele';
import { CdkDragDrop, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { ShoppingItemId } from '../../../../services/shopping-items.service.modele';
import { ShoppingListItemComponent } from '../item/shopping-list-item.component';

@Component({
  selector: 'app-shopping-list-category',
  standalone: true,
  imports: [ShoppingListItemComponent, CdkDropList, CdkDrag],
  templateUrl: './shopping-list-category.component.html',
  styleUrl: './shopping-list-category.component.scss',
})
export class ShoppingListCategoryComponent {
  @Input({ required: true }) category!: ShoppingStoreCategory;
  @Input({ required: true }) categoriesLists!: CdkDropList[];

  _dropList = viewChild<CdkDropList>('dropList');
  dropList(): CdkDropList {
    return this._dropList() as CdkDropList;
  }

  onDrop = output<CdkDragDrop<ShoppingItemId[]>>();
  drop(event: CdkDragDrop<ShoppingItemId[]>) {
    this.onDrop.emit(event);
  }
}
