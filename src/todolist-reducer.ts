import { v1 } from "uuid"
import { TodolistType } from "./types"


export const todolistsReducer = (state: TodolistType[], action: any): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': return state.filter(todolist => todolist.id !== action.todolistId)
        case 'ADD_TODOLIST': {
            const newTodolistId = v1()
            const newTodolist: TodolistType = { id: newTodolistId, title: action.value, filter: 'All' }

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
