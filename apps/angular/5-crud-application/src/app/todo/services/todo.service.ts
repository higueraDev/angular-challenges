import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
class TodoService {
  private http = inject(HttpClient);

  getAll() {
    return firstValueFrom(this.http.get<Todo[]>(environment.apiURL));
  }

  update(todo: Todo) {
    const url = `${environment.apiURL}/${todo.id}`;
    const body = JSON.stringify({ ...todo, completed: !todo.completed });
    const options = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };

    return firstValueFrom(this.http.put<Todo>(url, body, options));
  }

  delete(id: number) {
    const url = `${environment.apiURL}/${id}`;
    return firstValueFrom(this.http.delete(url));
  }
}

export default TodoService;
