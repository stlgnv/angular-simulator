import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  setValue<T>(key: string, value: T): void {
    const stringValue: string = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }

  getValue<T>(key: string): T | null {
    const value: string | null = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  clearElement(key: string): void {
    localStorage.removeItem(key);
  }

  clearStorage(): void {
    localStorage.clear();
  }

}
