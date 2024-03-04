import { ChangeEvent, useState, KeyboardEvent } from "react";
import { Button } from "./Button";
import { TaskType, FilterValuesType } from "./types";
import './App.css';

export type PropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    todolistId: string
    addTask: (todolistId: string, value: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeTasksFilter: (todolistId: string, filter: FilterValuesType) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: PropsType) => {

    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const addTask = () => {
        if (value.trim() === '') {
            setError('Title is required!')
        }
        if (value.trim() !== '') {
            props.addTask(props.todolistId, value.trim())
            setValue('')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            addTask()
        }
        setError(null)
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3>{props.title}</h3>
                <Button title="x" onClick={() => props.removeTodolist(props.todolistId)} />
            </div>
            <div>
                <input className={error ? "error" : ''}
                    value={value}
                    onChange={onChangeHandler}
                    onKeyUp={onKeyPressHandler} />
                <Button title="+" onClick={addTask} />
                {
                    error && <span className={error && "error-message"}
                        style={{ display: "block" }}>{error}</span>
                }
            </div>
            <ul style={{ listStyle: 'none' }}>
                {props.tasks.map(task => {
                    return (
                        <li key={task.id} className={task.isDone ? "is-done" : ''}>
                            <input type="checkbox"
                                checked={task.isDone}
                                onChange={(e) => props.changeTaskStatus(props.todolistId, task.id, e.currentTarget.checked)} />
                            <span>{task.title}</span>
                            <Button onClick={() => props.removeTask(props.todolistId, task.id)} title="x" />
                        </li>
                    );
                })}
            </ul>
            <div>
                <Button className={props.filter === 'All' ? "active-filter" : ''}
                    onClick={() => { props.changeTasksFilter(props.todolistId, "All") }} title="All" />
                <Button className={props.filter === 'Active' ? "active-filter" : ''}
                    onClick={() => { props.changeTasksFilter(props.todolistId, "Active") }} title="Active" />
                <Button className={props.filter === 'Completed' ? "active-filter" : ''}
                    onClick={() => { props.changeTasksFilter(props.todolistId, "Completed") }} title="Completed" />
            </div>
        </div>
    );
}

