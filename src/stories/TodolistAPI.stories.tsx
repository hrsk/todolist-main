import axios from 'axios'
import { useEffect, useState } from 'react'

export default {
    title: 'TODOLIST_API',
}

export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.1//todo-lists`, { withCredentials: true })
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)

    const value = 'NEW TITLE'
    useEffect(() => {
        axios.post(`https://social-network.samuraijs.com/api/1.1//todo-lists`, { title: value }, { withCredentials: true })
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null)

    const todolistId = '7acee6ad-7557-4f09-afb6-9025332f74af'

    useEffect(() => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1//todo-lists/${todolistId}`, { withCredentials: true })
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {

    const [state, setState] = useState<any>(null)

    const todolistId = 'd2d2faeb-c066-426c-b01f-c11c98ce93d4'
    const value = 'XZXZXZX NEW TITLE'

    useEffect(() => {
        axios.put(`https://social-network.samuraijs.com/api/1.1//todo-lists/${todolistId}`, { title: value }, { withCredentials: true })
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
