import { Component, output, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SeamlessInputTextComponent } from '../../../../seamless-input-text/seamless-input-text.component';

export type OnValidateEvent = { label: string; enter?: boolean };

@Component({
  selector: 'app-shopping-list-item-add',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, SeamlessInputTextComponent],
  templateUrl: './shopping-list-item-add.component.html',
  styleUrl: './shopping-list-item-add.component.scss',
})
export class ShoppingListItemAddComponent {
  label = signal<string>('');

  input = viewChild<SeamlessInputTextComponent>('input');

  onValidate = output<OnValidateEvent>();
  onCancel = output<void>();

  editLabelChange(value: string) {
    this.label.set(value);
  }
  validate({ enter }: { enter?: boolean } = {}) {
    const trimmed = this.label().trim();
    if (trimmed.length > 0) {
      this.onValidate.emit({ label: trimmed, enter });
    } else {
      this.cancel();
    }
  }
  cancel() {
    this.onCancel.emit();
  }

  reset() {
    this.label.set('');
    this.input()?.reset();
  }
}
