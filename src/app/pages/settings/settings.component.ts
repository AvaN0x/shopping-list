import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  themeService = inject(ThemeService);

  constructor() {}
}
