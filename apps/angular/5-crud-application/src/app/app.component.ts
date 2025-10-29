import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { CardComponent } from './card.component';
import { Todo } from './todo.model';
import TodoService from './todo.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      @for (todo of todos(); track todo.id) {
        <app-card class="todo-card" [title]="todo.title">
          <button mat-button (click)="update(todo)">Complete</button>
          <button mat-button (click)="delete(todo.id)">Delete</button>
        </app-card>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, MatButton],
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

  delete(id: number) {
    this.todoService
      .delete$(id)
      .subscribe(() =>
        this.todos.update((todos) => [...todos.filter((t) => t.id !== id)]),
      );
  }
}
