import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

  const requestTime: number = Date.now();

  const logRequest = (status: number) => {
    console.log(
      req.method,
      req.url,
      status,
      Date.now() - requestTime
    );
  }

  return next(req)
    .pipe(
      tap((event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          logRequest(event.status);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        logRequest(error.status);
        return throwError(() => error)
      })
    )

};
