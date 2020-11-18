import {Injectable} from '@angular/core';
import {Todo} from '../interfaces/todo';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError as observableThrowError} from 'rxjs';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  beforeEditCache = '';
  idForTodo = 4;
  filter = 'all';
  todos: Todo[] = [];

  constructor(private http: HttpClient) {
    this.todos = this.getTodos();
  }

  getTodos(): Todo[] {
    this.http.get(API_URL + '/todo')
      .pipe(catchError(this.errorHandler))
      .subscribe((response: any) => {
        this.todos = response.todos;
      });
    return this.todos;
  }

  errorHandler(error: HttpErrorResponse): Observable<never> {
    return observableThrowError(error.message || 'Something went wrong');
  }

  addTodo(todoTitle: string): void {
    if (todoTitle.trim().length === 0) {
      return;
    }
    this.http.post(API_URL + '/todo', {
      title: todoTitle,
      completed: false,
    }).subscribe((response: any) => {
      this.todos.push({
        id: response.todo.id,
        title: response.todo.title,
        completed: false,
        edit: false
      });
    });
    this.idForTodo++;
  }

  deleteTodo(id: number): void {
    this.http.delete(API_URL + '/todo/' + id)
      .subscribe(() => {
        this.todos = this.todos.filter(todo => todo.id !== id);
      });
  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.edit = true;
  }

  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.edit = false;
  }

  doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }
    this.http.put(API_URL + '/todo/' + todo.id, {
      title: todo.title,
      completed: todo.completed
    }).subscribe(() => {

    });
    todo.edit = false;
  }

  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  atLeastOneCompleted(): boolean {
    return this.todos.filter(todo => todo.completed).length > 0;
  }

  clearCompleted(): void {
    const completed = this.todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);
    console.log(completed);
    this.http.request('delete', API_URL + '/todo/deleteCompleted', {
      body: {
        todos: completed
      }
    })
      .subscribe(() => {
        this.todos = this.todos.filter(todo => !todo.completed);
      });
  }

  checkedAllTodos(): void {
    const checkedTodo = (event.target as HTMLInputElement).checked;
    this.http.put(API_URL + '/todo/checkedAll', {
      completed: checkedTodo
    }).subscribe(() => {
      this.todos.forEach(todo => todo.completed = checkedTodo);
    });
  }

  todosFilter(): Todo[] {
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }
    return this.todos;
  }

  updateCompleted(todo: Todo): void {
    this.http.put(API_URL + '/todo/' + todo.id, {
      title: todo.title,
      completed: (event.target as HTMLInputElement).checked
    }).subscribe(() => {

    });
  }
}
