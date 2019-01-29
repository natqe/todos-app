import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatSortModule, MatToolbarModule } from '@angular/material'
import { MatTableModule } from '@angular/material/table'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgxsEmitPluginModule } from '@ngxs-labs/emitter'
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { NgxsModule } from '@ngxs/store'
import { AddNewTodoComponent } from './add-new-todo/add-new-todo.component'
import { AppComponent } from './app.component'
import { DeleteTodoComponent } from './delete-todo/delete-todo.component'
import { TodoComponent } from './todo/todo.component'
import { TodosComponent } from './todos/todos.component'
import { TodosState } from './todos/todos.state'

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoComponent,
    AddNewTodoComponent,
    TodoComponent,
    DeleteTodoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgxsModule.forRoot([TodosState], {
      developmentMode: true
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({}),
    NgxsEmitPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    TodoComponent,
    DeleteTodoComponent
  ]
})
export class AppModule { }
