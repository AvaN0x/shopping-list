import { Component, inject } from '@angular/core';
import { ShoppingStoresService } from '../../../../services/shopping-stores.service';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ShoppingStore } from '../../../../services/shopping-stores.service.modele';
import { MatMenuModule } from '@angular/material/menu';
import { ShoppingStoreAddComponent } from '../add/shopping-store-add.component';

@Component({
  selector: 'app-shopping-store-selector',
  standalone: true,
  imports: [
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ShoppingStoreAddComponent,
  ],
  templateUrl: './shopping-store-selector.component.html',
  styleUrl: './shopping-store-selector.component.scss',
})
export class ShoppingStoreSelectorComponent {
  storesService = inject(ShoppingStoresService);

  rename(id: ShoppingStore['id']) {
    // TODO;
    console.log('rename', id);
  }

  delete(id: ShoppingStore['id']) {
    // TODO;
    console.log('delete', id);
  }
}
