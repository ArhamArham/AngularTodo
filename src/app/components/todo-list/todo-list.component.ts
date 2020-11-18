import {Component, OnInit} from '@angular/core';
import {Todo} from '../../interfaces/todo';
import {animate, style, transition, trigger} from '@angular/animations';
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [TodoService],
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
  todoTitle: string;

  constructor(public todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todoTitle = '';
  }

  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }
    this.todoService.addTodo(this.todoTitle);
    this.todoTitle = '';
  }
}
