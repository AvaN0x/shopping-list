import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', component: NotFoundComponent }, // Wildcard route for a 404 page
];
