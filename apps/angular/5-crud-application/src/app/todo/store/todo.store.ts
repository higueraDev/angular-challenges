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
};

const initialState: TodoStore = {
  loading: true,
  todos: [],
  error: '',
};

const handleError = (err: unknown, store: WritableStateSource<TodoStore>) => {
  let error = '';
  if (err instanceof HttpErrorResponse) {
    error = err.message;
  } else if (err instanceof Error) {
    error = err.message;
  } else {
    error = 'Unknown error';
  }
  patchState(store, { error });
};
export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, todoService = inject(TodoService)) => ({
    async loadAll() {
      try {
        const todos = await todoService.getAll();
        patchState(store, { todos });
      } catch (e) {
        handleError(e, store);
      } finally {
        patchState(store, { loading: false });
      }
    },
    async update(todo: Todo) {
      try {
        const updated = await todoService.update(todo);
        patchState(store, {
          todos: store.todos().map((t) => (t.id !== todo.id ? t : updated)),
        });
      } catch (e) {
        handleError(e, store);
      } finally {
        patchState(store, { loading: false });
      }
    },
    async delete(id: Todo['id']) {
      try {
        await todoService.delete(id);
        patchState(store, { todos: store.todos().filter((t) => t.id !== id) });
      } catch (e) {
        handleError(e, store);
      } finally {
        patchState(store, { loading: false });
      }
    },
  })),
);
