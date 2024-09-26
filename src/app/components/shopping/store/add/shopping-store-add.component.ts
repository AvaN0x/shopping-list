import { Component, effect, inject, OnDestroy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SeamlessInputTextComponent } from '../../../seamless-input-text/seamless-input-text.component';
import { SingleEditService } from '../../../../services/single-edit.service';
import { ShoppingStoresService } from '../../../../services/shopping-stores.service';
import { ShoppingStore } from '../../../../services/shopping-stores.service.modele';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-shopping-store-add',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, SeamlessInputTextComponent],
  templateUrl: './shopping-store-add.component.html',
  styleUrl: './shopping-store-add.component.scss',
})
export class ShoppingStoreAddComponent {
  singleEditService = inject(SingleEditService);
  storesService = inject(ShoppingStoresService);

  ngOnDestroy(): void {
    this.createCategoryEffect.destroy();
  }

  creating = signal<boolean>(false);
  createSessionId = signal<string | null>(null);
  duplicateId = signal<undefined | ShoppingStore['id']>(undefined);
  label = signal<string>('');

  editLabelChange(value: string) {
    this.label.set(value);
  }
  validate() {
    const trimmed = this.label().trim();
    if (trimmed.length > 0) {
      this.storesService.addStore(
        {
          label: trimmed,
        },
        this.duplicateId()
      );
    }
    this.reset();
  }
  reset() {
    this.duplicateId.set(undefined);
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

  startEdit(duplicateId?: ShoppingStore['id']) {
    // Already creating
    if (this.creating()) return;

    this.createSessionId.set(this.singleEditService.startEdit());
    // If we want to duplicate a store, we copy its label
    if (duplicateId) {
      const duplicateStore = this.storesService
        .stores()
        .find((s) => s.id === duplicateId);
      if (duplicateStore) {
        this.label.set(duplicateStore.label);
        this.duplicateId.set(duplicateId);
      }
    }
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
