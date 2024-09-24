import { Component, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SeamlessInputTextComponent } from '../../../../seamless-input-text/seamless-input-text.component';

@Component({
  selector: 'app-shopping-list-item-add',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, SeamlessInputTextComponent],
  templateUrl: './shopping-list-item-add.component.html',
  styleUrl: './shopping-list-item-add.component.scss',
})
export class ShoppingListItemAddComponent {
  label = signal<string>('');

  onValidate = output<string>();
  onCancel = output<void>();

  editLabelChange(value: string) {
    this.label.set(value);
  }
  validate() {
    const trimmed = this.label().trim();
    if (trimmed.length > 0) {
      this.onValidate.emit(trimmed);
    } else {
      this.cancel();
    }
  }
  cancel() {
    this.onCancel.emit();
  }
}
