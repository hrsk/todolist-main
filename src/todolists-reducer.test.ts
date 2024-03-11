import { v1 } from 'uuid'
import { addTodolistActionCreator, changeTodolistFilterActionCreator, changeTodolistTitleActionCreator, removeTodolistActionCreator, todolistsReducer } from './todolist-reducer'
import { TodolistType } from './types'

test('correct todolist should be removed', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]

    const endState = todolistsReducer(startState, removeTodolistActionCreator(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]

    const endState = todolistsReducer(startState, addTodolistActionCreator('new todolist'))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('new todolist')
})

test('correct todolist should change its name', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]

    const endState = todolistsReducer(startState, changeTodolistTitleActionCreator(todolistId2, 'new todolist title'))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('new todolist title')
})

test('correct filter of todolist should be changed', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]

    const endState = todolistsReducer(startState, changeTodolistFilterActionCreator(todolistId2, 'Completed'))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe('Completed')
})
