import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {Todo} from '../../interfaces/todo';
import {TodoService} from '../../services/todo.service';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;

  constructor(public todoService: TodoService) {
  }

  ngOnInit(): void {
  }

}
