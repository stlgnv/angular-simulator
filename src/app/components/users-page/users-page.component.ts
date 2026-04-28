import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AsyncPipe } from '@angular/common';
import { IUser } from '../../interfaces/IUser';
import { tap } from 'rxjs';
import { PhonePipe } from '../../pipes/phone.pipe';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, PhonePipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  userService: UserService = inject(UserService);

  constructor() {
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users)),
      ).subscribe();
  }

}
