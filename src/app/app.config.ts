import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { Theme } from '../enums/Theme';

type ThemePresetType = typeof Aura | typeof Lara | typeof Nora;

const initThemePreset = (): ThemePresetType => {
  const themeFromStorage: Theme | null = localStorage.getItem('theme') as Theme | null;
  const saveTheme: Theme = (themeFromStorage as Theme) ?? Theme.AURA;

  switch(saveTheme) {
    case Theme.NORA: return Nora;
    case Theme.LARA: return Lara;
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
