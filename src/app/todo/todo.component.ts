import { titleCase } from 'utilizes/title-case'
import { Component, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material'
import { Emittable, Emitter } from '@ngxs-labs/emitter'
import { TodosState } from '../todos/todos.state'
import { Todo } from './todo.model'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  @Emitter(TodosState.upsert)
  upsert: Emittable<Array<Partial<Todo> & { id: Todo['id'] }>>

  constructor(
    @Inject(MAT_DIALOG_DATA)
    readonly todo: Todo) {
  }

  readonly titleCase = titleCase

  readonly form = new FormGroup({
    title: new FormControl(this.todo.title, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    body: new FormControl(this.todo.body, [Validators.required]),
    maxDays: new FormControl(this.todo.maxDays, [Validators.required, Validators.min(1), Validators.max(100)])
  })

  errorMessage(control, { key }) {
    switch (key) {
      case 'required': return `The field ${control.key} is required`
      case 'max':
      case 'min': return `${titleCase(control.key)} cant be ${control.value.value}`
      case 'maxlength': return `${control.key} cannot be more then 15 letters`
      case 'minlength': return `${control.key} cannot be less then 3 letters`
    }
  }

  typeFor(field: keyof Todo) {
    switch (field) {
      case `id`:
      case `maxDays`: return 'number'
      default: return 'text'
    }
  }

  submit() {
    if (this.form.valid) this.upsert.emit([{
      ...this.form.value,
      id: this.todo.id,
      createdAt: this.todo.createdAt
    }])
  }

}
