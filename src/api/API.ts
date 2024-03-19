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
