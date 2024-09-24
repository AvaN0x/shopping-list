import {
  Component,
  effect,
  inject,
  OnDestroy,
  output,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SeamlessInputTextComponent } from '../../../../seamless-input-text/seamless-input-text.component';
import { SingleEditService } from '../../../../../services/single-edit.service';
import { ShoppingStoresService } from '../../../../../services/shopping-stores.service';

@Component({
  selector: 'app-shopping-list-category-add',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, SeamlessInputTextComponent],
  templateUrl: './shopping-list-category-add.component.html',
  styleUrl: './shopping-list-category-add.component.scss',
})
export class ShoppingListCategoryAddComponent implements OnDestroy {
  singleEditService = inject(SingleEditService);
  storesService = inject(ShoppingStoresService);

  ngOnDestroy(): void {
    this.createCategoryEffect.destroy();
  }

  creating = signal<boolean>(false);
  createSessionId = signal<string | null>(null);
  label = signal<string>('');

  editLabelChange(value: string) {
    this.label.set(value);
  }
  validate() {
    const trimmed = this.label().trim();
    if (trimmed.length > 0) {
      this.storesService.addCurrentStoreCategory({
        label: trimmed,
        itemsIds: [],
      });
    }
    this.reset();
  }
  reset() {
    this.label.set('');
    this.creating.set(false);
  }
  cancel() {
    this.reset();
  }

  // #region edit mode

  private createCategoryEffect = effect(() => {
    // If we are in edit mode and the current editing item id is not the current item id
    if (
      this.creating() &&
      this.singleEditService.currentEditId() !== this.createSessionId()
    ) {
      // Stop editing
      this.stopEdit();
    }
  });

  startEdit() {
    // Already creating
    if (this.creating()) return;

    this.createSessionId.set(this.singleEditService.startEdit());
    this.creating.set(true);
  }
  stopEdit() {
    // Not creating
    if (!this.creating()) return;

    // Wait for the blur event to be processed
    setTimeout(() => {
      this.reset();
    }, 0);
  }
  // #endregion edit mode
}
