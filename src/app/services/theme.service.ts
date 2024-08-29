import { Injectable } from '@angular/core';

const STORAGE_KEY = 'theme';

export type UsableThemes = 'light' | 'dark';
export type PossibleThemes = UsableThemes | 'device';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme: PossibleThemes = 'device';
  appliedTheme: UsableThemes = 'light';

  private mediaQueryList: MediaQueryList;

  constructor() {
    this.mediaQueryList = matchMedia('(prefers-color-scheme: dark)');

    // Load the stored theme mode
    const storedThemeMode = this.validateThemeMode(
      localStorage.getItem(STORAGE_KEY) ?? 'device'
    );
    this.setThemeMode(storedThemeMode);

    // Setup listener for device mode
    if (this.isDeviceModeSupported()) {
      this.mediaQueryList.addEventListener(
        'change',
        this.handleColorSchemeChange
      );
    }
  }

  private handleColorSchemeChange = (_event: MediaQueryListEvent) => {
    if (this.currentTheme !== 'device') return;

    this.reloadTheme();
  };

  /**
   * Checks if the device mode is supported.
   * @returns Whether the device mode is supported.
   */
  isDeviceModeSupported = (): boolean => {
    const query = '(prefers-color-scheme)';
    return query === matchMedia(query).media;
  };

  /**
   * Validates the given theme mode.
   * @param themeMode The theme mode to validate.
   * @returns The validated theme mode.
   */
  validateThemeMode = (themeMode: string): PossibleThemes => {
    return ['light', 'dark', 'device'].includes(themeMode)
      ? (themeMode as PossibleThemes)
      : 'device';
  };

  /**
   * Transforms the given theme mode into a usable theme mode.
   * @param themeMode The theme mode to get the usable theme mode for.
   * @returns The usable theme mode.
   */
  getUsableThemeMode = (themeMode: PossibleThemes): UsableThemes => {
    if (themeMode === 'light' || themeMode === 'dark') {
      return themeMode;
    }
    return this.mediaQueryList?.matches ? 'dark' : 'light';
  };

  /**
   * Applies the given theme to the document body.
   * @param theme The theme to apply.
   */
  private applyTheme = (theme: PossibleThemes) => {
    this.appliedTheme = this.getUsableThemeMode(theme);
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${this.appliedTheme}`);
  };

  /**
   * Set the given theme mode and save it to local storage.
   * @param themeMode The theme mode to set.
   */
  setThemeMode = (themeMode: PossibleThemes) => {
    // Set the theme mode and apply it
    this.currentTheme = themeMode;
    this.applyTheme(this.currentTheme);
    // Save the theme to local storage
    localStorage.setItem(STORAGE_KEY, this.currentTheme);
  };

  /**
   * Re-applies the current theme.
   */
  reloadTheme = () => {
    this.applyTheme(this.currentTheme);
  };
}
