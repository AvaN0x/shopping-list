import { Component } from '@angular/core';
import { ShoppingListComponent } from '../../components/shopping/list/shopping-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ShoppingListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
