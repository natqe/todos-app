import { defaultsDeep, findIndex } from 'lodash'
import { EmitterAction, Receiver } from '@ngxs-labs/emitter'
import { NgxsOnInit, Selector, State, StateContext } from '@ngxs/store'
import { Todo } from '../todo/todo.model'

const defaults = {
  loading: true,
  todos: <Todo[]>[]
}

@State<(typeof defaults)>({
  defaults,
  name: 'todos'
})
export class TodosState implements NgxsOnInit {

  @Selector()
  static items({ todos }: typeof defaults) {
    return todos
  }

  @Selector()
  static inLoadProcess({ loading }: typeof defaults) {
    return loading
  }

  @Receiver({ type: '[TODOS] Upsert' })
  static upsert({ getState, patchState }: StateContext<typeof defaults>, { payload }: EmitterAction<Array<Partial<Todo> & { Id: Todo['id'] }>>) {

    const todos = [...getState().todos]

    for (const item of payload) {

      const originalIndex = findIndex(todos, { id: item.Id })

      originalIndex !== -1 ? todos[originalIndex] = defaultsDeep(item, todos[originalIndex]) : todos.push(<Todo>item)

    }

    localStorage.todos = JSON.stringify(todos)

    patchState({ todos })

  }

  @Receiver({ type: '[TODOS] Remove' })
  static remove({ getState, patchState }: StateContext<typeof defaults>, { payload }: EmitterAction<Todo['id'][]>) {

    const todos = getState().todos.filter(({ id }) => !payload.includes(id))

    localStorage.todos = JSON.stringify(todos)

    patchState({
      todos
    })

  }

  ngxsOnInit({ patchState, getState }: StateContext<typeof defaults>) {

    const todos: Array<Todo> = JSON.parse(localStorage.todos = localStorage.todos || JSON.stringify([]))

    for (const todo of todos) todo.createdAt = new Date(todo.createdAt)

    patchState({ todos: JSON.parse(localStorage.todos), loading: false })

  }

}