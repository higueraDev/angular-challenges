import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
class TodoService {
  private http = inject(HttpClient);

  getAll$() {
    return this.http.get<Todo[]>(environment.apiURL);
  }

  update$(todo: Todo) {
    return this.http.put<Todo>(
      `${environment.apiURL}/${todo.id}`,
      JSON.stringify({ ...todo, completed: !todo.completed }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }
}

export default TodoService;
