import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {Todo} from '../../interfaces/todo';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() checkedItem = new EventEmitter();
  @Output() doubleClickedItem = new EventEmitter();
  @Output() cancelledItem = new EventEmitter();
  @Output() deletedItem = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  doneEdit(todo: Todo): void {
    this.checkedItem.emit(todo);
  }

  editTodo(todo: Todo): void {
    this.doubleClickedItem.emit(todo);
  }

  cancelEdit(todo: Todo): void {
    this.cancelledItem.emit(todo);
  }

  deleteTodo(id: number): void {
    this.deletedItem.emit(id);
  }

}
