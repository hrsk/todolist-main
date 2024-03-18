import { useEffect, useState } from 'react'
import { todolistAPI } from '../api/API'

export default {
    title: 'TODOLIST_API',
}

export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.getTodolists()
            .then(response => setState(response.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)

    const value = 'NEW TODOLIST'

    useEffect(() => {
        todolistAPI.createTodolist(value)
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null)

    const todolistId = '3a45a9f7-0629-431d-943f-b31bdc241c97'

    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId)
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {

    const [state, setState] = useState<any>(null)

    const todolistId = 'd2d2faeb-c066-426c-b01f-c11c98ce93d4'
    const value = 'UPDATE TODOLIST TITLE !'

    useEffect(() => {
        todolistAPI.updateTodolist(todolistId, value)
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
