import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { usePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { ITheme } from '../interfaces/ITheme';
import { LocalStorageService } from './local-storage.service';
import { ThemesName } from '../../enums/ThemesName';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private localStorage: LocalStorageService = inject(LocalStorageService);

  readonly themes: ITheme[] = [
    {
      name: ThemesName.AURA,
      preset: Aura
    },
    {
      name: ThemesName.LARA,
      preset: Lara
    },
    {
      name: ThemesName.NORA,
      preset: Nora
    }
  ];

  private themeSubject$: BehaviorSubject<ITheme> = new BehaviorSubject<ITheme>(this.initThemeFromStorage());
  theme$: Observable<ITheme> = this.themeSubject$.asObservable();

  private isDarkSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.initModeFromStorage());
  isDarkMode$: Observable<boolean> = this.isDarkSubject$.asObservable().pipe(
    tap((isDarkMode: boolean) => {
      const element: HTMLHtmlElement = document.querySelector('html')!;
      if (element) {
        isDarkMode ? element.classList.add('dark-theme') : element.classList.remove('dark-theme');
      }
    })
  );

  private initModeFromStorage(): boolean {
    return this.localStorage.getValue('dark-mode') ?? false;
  }

  private initThemeFromStorage(): ITheme {
    const savedThemeName: string | null = this.localStorage.getValue('theme');
    const foundTheme: ITheme | undefined = this.themes.find(theme => theme.name === savedThemeName);
    return foundTheme ?? this.themes[0];
  }

  toggleDarkMode(isDarkMode: boolean): void {
    this.isDarkSubject$.next(isDarkMode);
    this.localStorage.setValue('dark-mode', isDarkMode);
  }

  changeTheme(themeName: ThemesName): void {
    const foundTheme = this.themes.find(t => t.name === themeName);
    if (!foundTheme) return;

    this.themeSubject$.next(foundTheme);
    usePreset(foundTheme.preset);
    this.localStorage.setValue('theme', foundTheme.name);
  }

}
