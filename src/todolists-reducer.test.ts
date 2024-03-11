import { v1 } from 'uuid'
import { FilterValuesType, TodolistType } from './types'
import { todolistsReducer } from './todolist-reducer'

test('correct todolist should be removed', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]

    const endState = todolistsReducer(startState, { type: 'REMOVE_TODOLIST', todolistId: todolistId1 })

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistType> = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]

    const endState = todolistsReducer(startState, { type: 'ADD_TODOLIST', value: newTodolistTitle })

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const newTodolistTitle = 'New Todolist'

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]

    const action = {
        type: 'CHANGE_TODOLIST_TITLE',
        todolistId: todolistId2,
        value: newTodolistTitle
    }

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const newFilter: FilterValuesType = 'Completed'

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]

    const action = {
        type: 'CHANGE_TODOLIST_FILTER',
        todolistId: todolistId2,
        filter: newFilter
    }

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newFilter)
})
