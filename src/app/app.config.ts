import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { ThemesName } from '../enums/ThemesName';

type ThemePresetType = typeof Aura | typeof Lara | typeof Nora;

const initThemePreset = (): ThemePresetType => {
  const themeFromStorage: string | null = localStorage.getItem('theme');
  const saveTheme: ThemesName = themeFromStorage ? JSON.parse(themeFromStorage) : ThemesName.AURA;

  switch(saveTheme) {
    case ThemesName.NORA: return Nora;
    case ThemesName.LARA: return Lara;
    default: return Aura;
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    providePrimeNG({
      theme: {
        preset: initThemePreset(),
        options: {
          darkModeSelector: '.dark-mode'
        }
      }
    })
  ]
};
