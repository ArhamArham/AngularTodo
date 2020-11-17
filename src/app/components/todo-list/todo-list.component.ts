import {Component, OnInit} from '@angular/core';
import {Todo} from '../../interfaces/todo';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(30px)'}),
        animate(200, style({opacity: 1, transform: 'translateY(0)'}))
      ]),
      transition(':leave', [
        animate(200, style({opacity: 0, transform: 'translateY(30px)'}))
      ]),
    ])
  ]
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  todoTitle: string;
  beforeEditCache: string;
  idForTodo: number;
  filter: string;

  constructor() {
  }

  ngOnInit(): void {
    this.filter = 'all';
    this.todoTitle = '';
    this.idForTodo = 4;
    this.todos = [
      {
        id: 1,
        title: 'Angular starting',
        completed: false,
        edit: false
      }, {
        id: 2,
        title: 'Angular todo app',
        completed: false,
        edit: false
      }, {
        id: 3,
        title: 'hello from Angular',
        completed: false,
        edit: false
      }
    ];
  }

  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }
    this.todos.push({
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
      edit: false
    });
    this.todoTitle = '';
    this.idForTodo++;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
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
    todo.edit = false;
  }

  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  atLeastOneCompleted(): boolean {
    return this.todos.filter(todo => todo.completed).length > 0;
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  checkedAllTodos(): void {
    this.todos.forEach(todo => todo.completed = (event.target as HTMLInputElement).checked);
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
}
