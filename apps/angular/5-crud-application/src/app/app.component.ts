import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Todo } from './todo.model';
import TodoService from './todo.service';

@Component({
  selector: 'app-root',
  template: `
    @for (todo of todos(); track todo.id) {
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    }
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly todoService = inject(TodoService);
  todos = signal<Todo[]>([]);

  ngOnInit() {
    this.todoService
      .getAll$()
      .subscribe((todos) => this.todos.update((_) => todos));
  }

  update(todo: Todo) {
    this.todoService
      .update$(todo)
      .subscribe((updated) =>
        this.todos.update((todos) => [
          ...todos.filter((t) => t.id !== todo.id),
          updated,
        ]),
      );
  }
}
