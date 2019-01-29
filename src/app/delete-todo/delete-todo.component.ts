import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material'
import { Emittable, Emitter } from '@ngxs-labs/emitter'
import { Todo } from '../todo/todo.model'
import { TodosState } from '../todos/todos.state'

@Component({
  selector: 'app-delete-todo',
  templateUrl: './delete-todo.component.html',
  styleUrls: ['./delete-todo.component.scss']
})
export class DeleteTodoComponent {

  @Emitter(TodosState.remove)
  delete: Emittable<Todo['id'][]>

  constructor(
    @Inject(MAT_DIALOG_DATA)
    readonly todos: Array<Todo>) {
  }

  ok() {
    this.delete.emit(this.todos.map(({ id }) => id))
  }

}
