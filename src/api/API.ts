import axios from "axios"
import { TodolistResponseType, ResponseType } from "../types"

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-KEY': '4e5fa66a-7057-4e21-83cd-4056273fcd0e',
    }
})

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistResponseType[]>(`todo-lists`)
            .then(response => response)
    },
    createTodolist(value: string) {
        return instance.post<ResponseType<{ item: TodolistResponseType }>>(`todo-lists`, { title: value })
            .then(response => response)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
            .then(response => response)
    },
    updateTodolist(todolistId: string, value: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title: value })
            .then(response => response)
    }
}

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get(`todo-lists/${todolistId}/tasks`)
            .then(response => response)
    },
    createTask(todolistId: string, value: string) {
        return instance.post(`todo-lists/${todolistId}/tasks`, { title: value })
            .then(response => response)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then(response => response)
    },
    updateTask(todolistId: string, taskId: string, value: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, { title: value })
            .then(response => response)
    }
}
