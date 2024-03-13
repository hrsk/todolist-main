import { v1 } from 'uuid'
import { addTodolistActionCreator, changeTodolistFilterActionCreator, changeTodolistTitleActionCreator, removeTodolistActionCreator, todolistsReducer } from './todolist-reducer'
import { TodolistType } from './types'

let todolistId1: string
let todolistId2: string

let startState: TodolistType[]

beforeEach(() => {

    todolistId2 = v1()
    todolistId1 = v1()

    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'All' },
        { id: todolistId2, title: 'What to buy', filter: 'All' },
    ]
})
test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistActionCreator(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {

    const endState = todolistsReducer(startState, addTodolistActionCreator('new todolist'))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('new todolist')
})

test('correct todolist should change its name', () => {

    const endState = todolistsReducer(startState, changeTodolistTitleActionCreator(todolistId2, 'new todolist title'))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('new todolist title')
})

test('correct filter of todolist should be changed', () => {

    const endState = todolistsReducer(startState, changeTodolistFilterActionCreator(todolistId2, 'Completed'))

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe('Completed')
})
