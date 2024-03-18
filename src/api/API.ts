import axios from "axios"
import { TodolistResponseType, ResponseType } from "../types"

export const todolistAPI = {
    getTodolists() {
        return axios.get<TodolistResponseType[]>(`https://social-network.samuraijs.com/api/1.1/todo-lists`, { withCredentials: true })
            .then(response => response)
    },
    createTodolist(value: string) {
        return axios.post<ResponseType<{ item: TodolistResponseType }>>(`https://social-network.samuraijs.com/api/1.1//todo-lists`, { title: value }, { withCredentials: true })
            .then(response => response)
    },
    deleteTodolist(todolistId: string) {
        return axios.delete<ResponseType>(`https://social-network.samuraijs.com/api/1.1//todo-lists/${todolistId}`, { withCredentials: true })
            .then(response => response)
    },
    updateTodolist(todolistId: string, value: string) {
        return axios.put<ResponseType>(`https://social-network.samuraijs.com/api/1.1//todo-lists/${todolistId}`, { title: value }, { withCredentials: true })
            .then(response => response)
    }
}
