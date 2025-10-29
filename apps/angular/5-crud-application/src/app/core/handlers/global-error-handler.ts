import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      this.handleHttpError(error);
    } else {
      this.handleClientError(error);
    }
  }

  private handleHttpError(error: HttpErrorResponse): void {
    console.error('HTTP Error:', {
      status: error.status,
      message: error.message,
      url: error.url,
    });
  }

  private handleClientError(error: Error): void {
    console.error('Client Error:', error.message);
    console.error('Stack:', error.stack);
  }
}
