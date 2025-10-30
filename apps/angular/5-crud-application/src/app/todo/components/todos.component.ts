import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { CardComponent } from '../../core/components/card.component';
import { Todo } from '../models/todo.model';
import { TodoStore } from '../store/todo.store';

@Component({
  selector: 'app-todos',
  template: `
    <div class="container">
      @for (todo of store.todos(); track todo.id) {
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
export class TodosComponent implements OnInit {
  protected readonly store = inject(TodoStore);

  ngOnInit() {
    this.store.loadAll();
  }

  update(todo: Todo) {
    this.store.update(todo);
  }

  delete(id: number) {
    this.store.delete(id);
  }
}
