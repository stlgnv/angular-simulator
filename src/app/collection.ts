
export class Collection<T> {

  private items: T[] = [];

  constructor(initialData: T[] = []) {
    this.items = initialData;
  }

  getAll(): T[] {
    return [...this.items];
  }

  get(index: number): T | null {
    return this.items[index] ?? null;
  }

  add(item: T): void {
    this.items.push(item);
  }

  clear(): void {
    this.items = [];
  }

  remove(index: number): void {
    this.items.splice(index, 1);
  }

  replace(index: number, newItem: T): void {
    if (this.items[index] !== undefined) {
      this.items[index] = newItem;
    }
  }

}
