import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TodoStore } from '../store/todo.store';
import { TodoComponent } from './todo.component';

@Component({
  selector: 'app-todos',
  template: `
    <div class="container">
      @for (todo of store.todos(); track todo.id) {
        <app-todo
          [title]="todo.title"
          (update)="update(todo)"
          (delete)="delete(todo.id)"
          [disabled]="store.loading()"
          [completed]="todo.completed"></app-todo>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TodoComponent],
})
export class TodosComponent {
  protected readonly store = inject(TodoStore);

  update(todo: Todo) {
    this.store.update(todo);
  }

  delete(id: number) {
    this.store.delete(id);
  }
}
