import { Component, inject } from '@angular/core';
import { ShoppingStoresService } from '../../../../services/shopping-stores.service';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ShoppingStore } from '../../../../services/shopping-stores.service.modele';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-shopping-store-selector',
  standalone: true,
  imports: [MatListModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './shopping-store-selector.component.html',
  styleUrl: './shopping-store-selector.component.scss',
})
export class ShoppingStoreSelectorComponent {
  storesService = inject(ShoppingStoresService);

  rename(id: ShoppingStore['id']) {
    // TODO;
    console.log('rename', id);
  }

  duplicate(id: ShoppingStore['id']) {
    // TODO;
    console.log('duplicate', id);
  }

  delete(id: ShoppingStore['id']) {
    // TODO;
    console.log('delete', id);
  }
}
