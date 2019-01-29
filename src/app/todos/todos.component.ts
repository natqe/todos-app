import * as addDays from 'date-fns/add_days'
import { Observable, Subscription } from 'rxjs'
import { titleCase } from 'utilizes/title-case'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { SelectionModel } from '@angular/cdk/collections'
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material'
import { Select } from '@ngxs/store'
import { DeleteTodoComponent } from '../delete-todo/delete-todo.component'
import { Todo } from '../todo/todo.model'
import { TodosState } from './todos.state'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class TodosComponent implements OnInit, OnDestroy {

  @Select(TodosState.items)
  todos: Observable<ReturnType<typeof TodosState.items>>

  expandedElement: Todo | null

  constructor(private readonly matDialog: MatDialog) { }

  private readonly subscriptions: Array<Subscription> = []

  items = new MatTableDataSource<Todo>()

  selection = new SelectionModel<Todo>(true, [])

  columnsToDisplay: string[] = [`select`, `id`, `title`, `endDate`]

  titleCase = titleCase

  @ViewChild(MatSort)
  set sort(value: MatSort) {

    this.items.sort = value

    this.items.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'endDate': return this.endDate(item).getTime()
        default: return item[property]
      }
    }

  }

  remove() {
    this.matDialog.open(DeleteTodoComponent, {
      data: this.selection.selected
    })
  }

  endDate({ createdAt, maxDays }: Todo) {
    return addDays(createdAt, maxDays)
  }

  applyFilter(filterValue: string) {
    this.items.filter = filterValue.trim().toLowerCase()
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.items.data.length;
    return numSelected == numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.items.data.forEach(row => this.selection.select(row));
  }

  ngOnInit() {

    const { todos, subscriptions } = this

    subscriptions.push(todos.subscribe(value => this.items.data = value))

  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) subscription.unsubscribe()
  }

}
