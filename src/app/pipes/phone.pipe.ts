import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
  standalone: true
})
export class PhonePipe implements PipeTransform {

  transform(phone: string): string {
    const main = phone.split('x')[0];
    const digits = main.replace(/\D/g, '');
    return '+' + digits;
  }

}
