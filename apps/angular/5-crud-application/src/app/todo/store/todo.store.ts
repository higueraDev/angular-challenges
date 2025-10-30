import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { Todo } from '../models/todo.model';
import TodoService from '../services/todo.service';

type TodoStore = {
  loading: boolean;
  todos: Todo[];
};

const initialState: TodoStore = {
  loading: true,
  todos: [],
};
export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, todoService = inject(TodoService)) => ({
    loadAll: rxMethod<void>(
      pipe(
        switchMap(() => todoService.getAll$()),
        tapResponse({
          next: (todos) => patchState(store, { todos, loading: false }),
          error: (err) => {
            patchState(store, { loading: false });
            console.error(err);
          },
        }),
      ),
    ),
    update: rxMethod<Todo>(
      pipe(
        switchMap((todo) => todoService.update$(todo)),
        tapResponse({
          next: (updated) =>
            patchState(store, {
              todos: store
                .todos()
                .map((t) => (t.id !== updated.id ? t : updated)),
              loading: false,
            }),
          error: (err) => {
            patchState(store, { loading: false });
            console.error(err);
          },
        }),
      ),
    ),
    delete: rxMethod<number>(
      pipe(
        switchMap((id) =>
          todoService.delete$(id).pipe(
            tapResponse({
              next: () =>
                patchState(store, {
                  todos: store.todos().filter((t) => t.id !== id),
                  loading: false,
                }),
              error: (err) => {
                patchState(store, { loading: false });
                console.error(err);
              },
            }),
          ),
        ),
      ),
    ),
  })),
);
