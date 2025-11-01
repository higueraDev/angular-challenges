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
      <div class="spinner-container">
        <app-spinner></app-spinner>
      </div>
    }
  `,
  styles: [
    `
      .spinner-container {
        position: fixed;
        height: 100dvh;
        width: 100dvw;
        top: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.6);
        z-index: 1000;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TodosComponent, SpinnerComponent],
})
export class AppComponent implements OnInit {
  protected readonly store = inject(TodoStore);

  ngOnInit() {
    this.store.loadAll();
  }
}
