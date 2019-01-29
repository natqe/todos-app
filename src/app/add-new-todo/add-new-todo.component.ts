import { maxBy } from 'lodash'
import { Observable } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { Select } from '@ngxs/store'
import { TodoComponent } from '../todo/todo.component'
import { Todo } from '../todo/todo.model'
import { TodosState } from '../todos/todos.state'

@Component({
  selector: 'app-add-new-todo',
  templateUrl: './add-new-todo.component.html',
  styleUrls: ['./add-new-todo.component.scss']
})
export class AddNewTodoComponent {

  @Select(TodosState.items)
  todos: Observable<ReturnType<typeof TodosState.items>>

  constructor(private readonly matDialog: MatDialog) { }

  handleClick() {

    let id: Todo['id']

    this.todos.subscribe(items => id = items.length ? maxBy(items, `id`).id + 1 : 1).unsubscribe()

    this.matDialog.open(TodoComponent, {
      data: <Todo>{
        title: ``,
        body: ``,
        id,
        createdAt: new Date,
        maxDays: 1
      }
    })
  }

}
