import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AsyncPipe } from '@angular/common';
import { IUser } from '../../interfaces/IUser';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
import { UserCardComponent } from './user-card/user-card.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UsersFilterComponent } from './users-filter/users-filter.component';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, UserCreateComponent, UsersFilterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
  standalone: true
})
export class UsersPageComponent {

  userService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.userService.users$;

  filterSubject$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  filterUsers$ = combineLatest([this.users$, this.filterSubject$]).pipe (
    map(([users, query]: [IUser[], string]): IUser[] => {
      const trimQuery: string = query.trim();
      if (!trimQuery) {
        return users;
      }

      return users.filter((user: IUser) =>
        user.name?.toLowerCase().includes(trimQuery.toLowerCase()) ?? false
      );
    })
  );

  ngOnInit() {
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users)),
      ).subscribe()
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id);
  }

  onCreateUser(user: IUser): void {
    this.userService.addUser(user);
  }

  onFilterChange(query: string): void {
    this.filterSubject$.next(query);
  }

}
