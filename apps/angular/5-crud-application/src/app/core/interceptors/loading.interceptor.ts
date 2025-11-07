import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { delay, mergeMap, of, throwError } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    delay(1000),
    mergeMap((response) => {
      if (Math.random() < 0.2) {
        return throwError(
          () =>
            new HttpErrorResponse({
              error: 'Simulated error',
              status: 500,
              statusText: 'Internal Server Error',
              url: req.url,
            }),
        );
      }
      return of(response);
    }),
  );
};
