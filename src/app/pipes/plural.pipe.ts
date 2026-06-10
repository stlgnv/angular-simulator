import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {

  transform(value: number | string, one: string, few: string, many: string): string {
    const num: number = Number(value);

    if (isNaN(num)) return '';

    const lastTwo: number = num % 100;
    const lastOne: number = num % 10;

    if (lastTwo >= 11 && lastTwo <= 14) {
      return value + ' ' + many;
    }

    if (lastOne === 1) {
      return value + ' ' + one;
    }

    if (lastOne >= 2 && lastOne <= 4) {
      return value + ' ' + few;
    }

    return value + ' ' + many;
  }

}
