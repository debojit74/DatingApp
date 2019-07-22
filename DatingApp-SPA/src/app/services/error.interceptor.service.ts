import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          //Unauthorized
          if (error.status === 401) {
            return throwError(error.statusText);
          }
          //Application-Error: Internal Server Error
          const applicationError = error.headers.get("Application-Error");
          if (applicationError) {
            console.log(applicationError)
            return throwError(applicationError);
          }
          //Model state error
          const serverError = error.error.errors;
          let modalStateErrors = '';
          if(serverError && typeof serverError === "object"){
            for (const key in serverError) {
              if (serverError[key]) {
                modalStateErrors += serverError[key] + '\n';
              }
            }
          }
          return throwError(modalStateErrors || serverError || "Server Error");
        }
      })
    );
  }
}

export const ErrorInterceptorProvide = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
}


