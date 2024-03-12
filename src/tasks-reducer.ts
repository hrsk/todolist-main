import { v1 } from "uuid"
import { TaskType, TasksType } from "./types"
import { AddTodolistActionType, RemoveTodolistActionType, todolistID1, todolistID2 } from "./todolist-reducer"

export type InitialStateType = TasksType

const initialState: InitialStateType = {
    [todolistID1]: [
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'React', isDone: false },
        { id: v1(), title: 'NodeJS', isDone: false },],
    [todolistID2]: [
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'React', isDone: false },
        { id: v1(), title: 'NodeJS', isDone: false },
    ],

}


export const tasksReducer = (state = initialState, action: ActionsType | AddTodolistActionType | RemoveTodolistActionType): InitialStateType => {
    switch (action.type) {
        case 'ADD_TASK': {
            const newTask: TaskType = { id: v1(), title: action.value, isDone: false }

            return { ...state, [action.todolistId]: [newTask, ...state[action.todolistId]] }
        }
        case 'REMOVE_TASK': return {
            ...state,
            [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
        }
        case 'CHANGE_TASK_TITLE': return {
            ...state, [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId
                ? { ...task, title: action.value }
                : task)
        }
        case 'CHANGE_TASK_STATUS': return {
            ...state, [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId
                ? { ...task, isDone: action.isDone }
                : task)
        }
        case 'ADD_TODOLIST': return { ...state, [action.todolistId]: [] }
        case 'REMOVE_TODOLIST': {
            delete state[action.todolistId]
            return { ...state }
        }
        default: return state
    }
}

//types

type ActionsType = AddTaskActionType
    | RemoveTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType

export type AddTaskActionType = {
    type: 'ADD_TASK'
    todolistId: string
    value: string
}

export type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    todolistId: string
    taskId: string
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    todolistId: string
    taskId: string
    value: string
}

type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}

//actions

export const addTaskActionCreator = (todolistId: string, value: string): AddTaskActionType => {
    return {
        type: 'ADD_TASK',
        todolistId,
        value,
    }
}

export const removeTaskActionCreator = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE_TASK',
        todolistId,
        taskId,
    }
}

export const changeTaskTitleActionCreator = (todolistId: string, taskId: string, value: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE_TASK_TITLE',
        todolistId,
        taskId,
        value,
    }
}

export const changeTaskStatusActionCreator = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE_TASK_STATUS',
        todolistId,
        taskId,
        isDone,
    }
}
