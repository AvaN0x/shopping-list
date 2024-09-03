import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [MatIconModule, MatRadioModule],
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.scss',
})
export class ThemeSelectorComponent {
  themeService = inject(ThemeService);

  constructor() {}
}
