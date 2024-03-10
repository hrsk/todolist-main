import { ChangeEvent, useState, KeyboardEvent } from "react";
import { Button } from "./Button";
import { TaskType, FilterValuesType } from "./types";
import './App.css';
import { AddItemForm } from "./AddItemForm";

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

    // const [value, setValue] = useState<string>('')
    // const [error, setError] = useState<string | null>(null)

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setValue(e.currentTarget.value)
    // }
    const addTask = (value: string) => {
        props.addTask(props.todolistId, value)
        // if (value.trim() === '') {
        //     setError('Title is required!')
        // }
        // if (value.trim() !== '') {
        //     props.addTask(props.todolistId, value.trim())
        //     setValue('')
        // }
    }

    // const onKeyPressHandler = (e: KeyboardEvent) => {
    //     if (e.key === 'Enter') {
    //         addTask()
    //     }
    //     if (error !== null) {
    //         setError(null)
    //     }
    // }

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    const changeTaskStatusHandler = (taskId: string, isDone: boolean) => {
        props.changeTaskStatus(props.todolistId, taskId, isDone)
    }

    const removeTaskHandler = (taskId: string) => {
        props.removeTask(props.todolistId, taskId)
    }

    const changeFilterHandler = (filter: FilterValuesType) => {
        props.changeTasksFilter(props.todolistId, filter)
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3>{props.title}</h3>
                <Button title="x" onClick={removeTodolistHandler} />
            </div>
            <AddItemForm callback={addTask} />
            {/* <div>
                <input className={error ? "errorBorder" : ''}
                    value={value}
                    onChange={onChangeHandler}
                    onKeyUp={onKeyPressHandler} />
                <Button title="+" onClick={addTask} />
                {
                    error && <span className={error && "errorMessage"}
                        style={{ display: "block" }}>{error}</span>
                }
            </div> */}
            <ul style={{ listStyle: 'none' }}>
                {props.tasks.map(task => {
                    return (
                        <li key={task.id} className={task.isDone ? "isDone" : ''}>
                            <input type="checkbox"
                                checked={task.isDone}
                                onChange={(e) => changeTaskStatusHandler(task.id, e.currentTarget.checked)} />
                            <span>{task.title}</span>
                            <Button onClick={() => removeTaskHandler(task.id)} title="x" />
                        </li>
                    );
                })}
            </ul>
            <div>
                <Button className={props.filter === 'All' ? "isActive" : ''}
                    onClick={() => changeFilterHandler('All')} title="All" />
                <Button className={props.filter === 'Active' ? "isActive" : ''}
                    onClick={() => changeFilterHandler('Active')} title="Active" />
                <Button className={props.filter === 'Completed' ? "isActive" : ''}
                    onClick={() => changeFilterHandler('Completed')} title="Completed" />
            </div>
        </div>
    );
}

