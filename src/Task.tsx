import { memo, useCallback } from 'react'
import './App.css'
import { Button } from './Button'
import { EditableForm } from './EditableForm'
import { TaskType } from './types'

type PropsType = {
    todolistId: string
    task: TaskType
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, value: string) => void
}

export const Task = memo((props: PropsType) => {

    const changeTaskStatusHandler = useCallback((taskId: string, isDone: boolean) => {
        props.changeTaskStatus(props.todolistId, taskId, isDone)
    }, [props.changeTaskStatus, props.todolistId])

    const removeTaskHandler = useCallback((taskId: string) => {
        props.removeTask(props.todolistId, taskId)
    }, [props.removeTask, props.todolistId])

    const changeTaskTitleHandler = useCallback((taskId: string, value: string) => {
        props.changeTaskTitle(props.todolistId, taskId, value)
    }, [props.changeTaskTitle, props.todolistId])

    return (
        <li className={props.task.isDone ? "isDone" : ''}>
            <input type="checkbox"
                checked={props.task.isDone}
                onChange={(e) => changeTaskStatusHandler(props.task.id, e.currentTarget.checked)} />
            <EditableForm value={props.task.title} callback={(value) => changeTaskTitleHandler(props.task.id, value)} />
            <Button onClick={() => removeTaskHandler(props.task.id)} title="x" />
        </li>
    )
})
