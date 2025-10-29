import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SpinnerComponent } from './core/components/spinner';
import LoadingService from './core/services/loading.service';
import { TodosComponent } from './todo/components/todos.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="text-center">
      @if (loadingService.loading()) {
        <app-spinner></app-spinner>
      }
    </div>
    <app-todos></app-todos>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TodosComponent, SpinnerComponent],
})
export class AppComponent {
  protected readonly loadingService = inject(LoadingService);
}
