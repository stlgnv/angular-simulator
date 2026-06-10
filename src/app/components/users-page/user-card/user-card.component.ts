import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../../interfaces/IUser';
import { UpperCasePipe } from '@angular/common';
import { PhoneFormatPipe } from '../../../pipes/phone-format.pipe';
import { GradientBorderDirective } from '../../../directives/gradient-border.directive';
import { BoldHoverDirective } from '../../../directives/bold-hover.directive';

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, PhoneFormatPipe, GradientBorderDirective, BoldHoverDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  standalone: true
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;

  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();

  onDelete(): void {
    this.deleteUser.emit(this.user.id);
  }

}
