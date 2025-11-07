import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { SpinnerComponent } from './core/components/spinner';
import { TodosComponent } from './todo/components/todos.component';
import { TodoStore } from './todo/store/todo.store';

@Component({
  selector: 'app-root',
  template: `
    <app-todos></app-todos>
    @if (store.loading()) {
      <div>
        <app-spinner></app-spinner>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TodosComponent, SpinnerComponent],
})
export class AppComponent implements OnInit {
  protected readonly store = inject(TodoStore);

  ngOnInit() {
    this.store.loadAll();
  }
}
