import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

  const messageService = inject(NotificationService)
  return next(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status >= 500 && error.status <= 599) {
          messageService.showErrorMessage('Ошибка сервера');
        }
        return throwError(() => error)
      })
    )

};
