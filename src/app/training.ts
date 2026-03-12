export interface IUser {
  name: string;
  age: number;
  city?: string;
}

export interface IAdminUser extends IUser {
  role: string;
}

export let status: 'loading' | 'success' | 'error';

export let textFormat: 'uppercase' | 'lowercase' | 'capitalize';

export const users: IUser[] = [
  { name: 'Adil', age: 28, city: 'Almaty' },
  { name: 'Alex', age: 25, city: 'Astana' },
  { name: 'Adilet', age: 27, city: 'Bishkek' },
];

const filtredUsers: IUser[] = users.filter((user) => user.age !== undefined && user.age > 26);

export function sumNumbers(a: number, b: number): number {
  return a + b;
}

export function removeChar(text: string, charToRemove: string): string {
  const regex = new RegExp(charToRemove, 'g');
  return text.replace(regex, '');
}

export function formatString(text: string, format: typeof textFormat): string {
  if (format === 'uppercase') {
    return text.toUpperCase();
  }

  if (format === 'lowercase') {
    return text.toLowerCase();
  }

  if (format === 'capitalize') {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  return text;
}
