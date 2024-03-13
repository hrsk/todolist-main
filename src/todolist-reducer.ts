import { v1 } from "uuid"
import { FilterValuesType, TodolistType } from "./types"

export type InitialStateType = TodolistType[]

export const todolistID1: string = v1()
export const todolistID2: string = v1()

const initialState: InitialStateType = [
    { id: todolistID1, title: 'What to learn', filter: 'All' },
    { id: todolistID2, title: 'Movies', filter: 'All' },
]

export const todolistsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': return state.filter(todolist => todolist.id !== action.todolistId)
        case 'ADD_TODOLIST': {
            // const newTodolistId = v1()
            const newTodolist: TodolistType = { id: action.todolistId, title: action.value, filter: 'All' }

            return [newTodolist, ...state]
        }
        case 'CHANGE_TODOLIST_TITLE': return state.map(todolist => todolist.id === action.todolistId
            ? { ...todolist, title: action.value }
            : todolist)
        case 'CHANGE_TODOLIST_FILTER': return state.map(todolist => todolist.id === action.todolistId
            ? { ...todolist, filter: action.filter }
            : todolist)
        default: return state
    }
}

//types

type ActionsType = AddTodolistActionType
    | RemoveTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export type AddTodolistActionType = ReturnType<typeof addTodolistActionCreator>

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistActionCreator>

type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleActionCreator>

type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterActionCreator>

//actions

export const addTodolistActionCreator = (value: string) => {
    return {
        type: 'ADD_TODOLIST',
        todolistId: v1(),
        value,
    } as const
}

export const removeTodolistActionCreator = (todolistId: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        todolistId,
    } as const
}

export const changeTodolistFilterActionCreator = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        todolistId,
        filter,
    } as const
}

export const changeTodolistTitleActionCreator = (todolistId: string, value: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        todolistId,
        value,
    } as const
}
