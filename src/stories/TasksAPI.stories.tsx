import { useEffect, useState } from 'react'
import { tasksAPI } from '../api/API'

export default {
    title: 'TASKS_API',
}

export const GetTasks = () => {

    const [state, setState] = useState<any>(null)

    const todolistId = 'ce0dcc35-268e-4ddf-b732-2c06ad873573'

    useEffect(() => {
        tasksAPI.getTasks(todolistId)
            .then(response => setState(response.data.items))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {

    const [state, setState] = useState<any>(null)

    const value = 'NEW TASK'
    const todolistId = 'ce0dcc35-268e-4ddf-b732-2c06ad873573'

    useEffect(() => {
        tasksAPI.createTask(todolistId, value)
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {

    const [state, setState] = useState<any>(null)

    const todolistId = 'ce0dcc35-268e-4ddf-b732-2c06ad873573'
    const taskId = '4b1b80ab-032f-4fce-a37e-7e461a9e6ff2'

    useEffect(() => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {

    const [state, setState] = useState<any>(null)

    const todolistId = 'ce0dcc35-268e-4ddf-b732-2c06ad873573'
    const taskId = 'b720b540-b1a0-4062-a640-850258deed84'
    const value = 'UPDATE TASK TITLE !'

    useEffect(() => {
        tasksAPI.updateTask(todolistId, taskId, value)
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
