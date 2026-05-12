import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../../interfaces/IUser';
import { PhonePipe } from '../../../pipes/phone.pipe';

@Component({
  selector: 'app-user-card',
  imports: [PhonePipe],
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
