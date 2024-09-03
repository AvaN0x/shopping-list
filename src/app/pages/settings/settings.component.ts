import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ThemeSelectorComponent } from '../../components/settings/theme-selector/theme-selector.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatButtonModule, ThemeSelectorComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  constructor() {}
}
