import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SpinnerComponent } from './core/components/spinner';
import { TodosComponent } from './todo/components/todos.component';
import { TodoStore } from './todo/store/todo.store';

@Component({
  selector: 'app-root',
  template: `
    <div class="text-center">
      @if (store.loading()) {
        <app-spinner></app-spinner>
      }
    </div>
    <app-todos></app-todos>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TodosComponent, SpinnerComponent],
})
export class AppComponent {
  protected readonly store = inject(TodoStore);
}
