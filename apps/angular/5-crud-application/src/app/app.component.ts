import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './core/components/DialogComponent';
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
  readonly dialog = inject(MatDialog);

  private readonly errorEffect = effect(() => {
    const error = this.store.error();
    if (error) {
      this.openDialog(error);
    }
  });

  ngOnInit() {
    this.store.loadAll();
  }

  openDialog(error: string) {
    this.dialog.open(DialogComponent, {
      data: {
        action: () => this.store.retry(),
        message: error,
        title: 'Oops...',
        buttonText: 'Retry',
      },
    });
  }
}
