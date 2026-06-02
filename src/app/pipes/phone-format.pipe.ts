import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
})
export class PhoneFormatPipe implements PipeTransform {

  transform(phone: string, mode: 'compact' | 'international' | 'national' | 'masked'): string {

    if (!phone) return '';

    const clean: string = phone.replace(/\D/g, '');

    switch(mode) {
      case 'compact': {
        return `+${clean}`;
      }

      case 'international': {

        const countryCode: string = clean.slice(0, 3);
        const rest: string = clean.slice(3);

        const groups: string = rest.match(/.{1,2}/g)?.join(' ') || '';

        return `+${countryCode} ${groups}`.trim();
      }

      case 'national': {
        let national: string = clean;
        if(national.startsWith('8')) {
          national = national.slice(1);
        } else if (national.startsWith('7')) {
          national = national.slice(1);
        }

        const groups: string = national.match(/.{1,2}/g)?.join('') || '';
        return groups;
      }

        case 'masked': {
        const countryCode: string = clean.slice(0, 2);
        const operator: string = clean.slice(2, 5);
        const last2: string = clean.slice(-2);
        const middleLength: number = clean.length - 7;

        const masked: string = '*'.repeat(Math.max(0, middleLength));

        return `+${countryCode} ${operator} ${masked} ${last2}`.trim();
        }

      default:
        return phone;
    }
  }

}
