import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from './core/handlers/global-error-handler';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { TodoStore } from './todo/store/todo.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([loadingInterceptor])),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    TodoStore,
  ],
};
