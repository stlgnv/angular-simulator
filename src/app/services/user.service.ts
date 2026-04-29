import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, finalize, Observable, of } from 'rxjs';
import { UsersApiService } from './users-api.service';
import { LoaderService } from './loader.service';
import { NotificationService } from './notification.service';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  usersApi: UsersApiService = inject(UsersApiService);
  loaderService: LoaderService = inject(LoaderService);
  notificationService: NotificationService = inject(NotificationService);

  private usersSubject$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject$.asObservable();

  setUsers(user: IUser[]): void {
    this.usersSubject$.next(user);
  }

  getUsers(): IUser[] {
    return this.usersSubject$.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader();
    return this.usersApi.getUsers()
      .pipe(
        catchError(() => {
          this.notificationService.showErrorMessage('Нет пользователей для отображения');
          return of([]);
        }),
        finalize(() => this.loaderService.hideLoader()),
      );
  }

}
