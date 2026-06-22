import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, of } from 'rxjs';
import { UsersApiService } from './users-api.service';
import { LoaderService } from './loader.service';
import { NotificationService } from './notification.service';
import { IUser } from '../interfaces/IUser';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  usersApi: UsersApiService = inject(UsersApiService);
  loaderService: LoaderService = inject(LoaderService);
  notificationService: NotificationService = inject(NotificationService);
  localStorageService: LocalStorageService = inject(LocalStorageService);

  private readonly USERS_KEY: string = 'users_data';

  private usersSubject$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject$.asObservable();

  setUsers(user: IUser[]): void {
    this.usersSubject$.next(user);
    this.localStorageService.setValue(this.USERS_KEY, user);
  }

  deleteUser(id: number): void {
    const updatedUsers: IUser[] = this.getUsers()
      .filter((user: IUser) => user.id !== id);
    this.setUsers(updatedUsers);
  }

  addUser(user: IUser): void {
    const users: IUser[] = this.getUsers();
    this.setUsers([...users, user]);
  }

  getUsers(): IUser[] {
    return this.usersSubject$.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    const localUsers: IUser[] | null = this.localStorageService.getValue<IUser[]>(this.USERS_KEY);
    if (localUsers && localUsers.length > 0) {
      this.setUsers(localUsers);
      return of(localUsers);
    }
    this.loaderService.showLoader();
    return this.usersApi.getUsers()
      .pipe(
        finalize(() => this.loaderService.hideLoader()),
      );
  }

}
