import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withMethods,
  withState,
  WritableStateSource,
} from '@ngrx/signals';
import { Todo } from '../models/todo.model';
import TodoService from '../services/todo.service';

type TodoStore = {
  loading: boolean;
  todos: Todo[];
  error: string;
  lastFailedAction: (() => Promise<void>) | null;
};

const initialState: TodoStore = {
  loading: false,
  todos: [],
  error: '',
  lastFailedAction: null,
};

const handleError = (
  err: unknown,
  store: WritableStateSource<TodoStore>,
  action: () => Promise<void>,
) => {
  let error = '';
  if (err instanceof HttpErrorResponse) {
    error = err.error;
  } else if (err instanceof Error) {
    error = err.message;
  } else {
    error = 'Unknown error';
  }
  patchState(store, { error, lastFailedAction: action });
};
export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, todoService = inject(TodoService)) => ({
    async loadAll() {
      patchState(store, {
        loading: true,
        error: '',
        lastFailedAction: null,
      });
      try {
        const todos = await todoService.getAll();
        patchState(store, { todos });
      } catch (e) {
        handleError(e, store, () => this.loadAll());
      } finally {
        patchState(store, { loading: false });
      }
    },
    async update(todo: Todo) {
      patchState(store, { loading: true });
      try {
        const updated = await todoService.update(todo);
        patchState(store, {
          todos: store.todos().map((t) => (t.id !== todo.id ? t : updated)),
          error: '',
          lastFailedAction: null,
        });
      } catch (e) {
        handleError(e, store, () => this.update(todo));
      } finally {
        patchState(store, { loading: false });
      }
    },
    async delete(id: Todo['id']) {
      patchState(store, { loading: true });
      try {
        await todoService.delete(id);
        patchState(store, {
          todos: store.todos().filter((t) => t.id !== id),
          error: '',
          lastFailedAction: null,
        });
      } catch (e) {
        handleError(e, store, () => this.delete(id));
      } finally {
        patchState(store, { loading: false });
      }
    },
    async retry() {
      const action = store.lastFailedAction();
      if (action) {
        await action();
      }
    },
  })),
);
