import { ChangeEvent, useState, KeyboardEvent } from "react";
import { Button } from "./Button";
import { TaskType, FilterValuesType } from "./types";

export type PropsType = {
    title: string
    tasks: TaskType[]
    addTask: (value: string) => void
    removeTask: (taskId: string) => void
    changeTasksFilter: (filter: FilterValuesType) => void
}

export const Todolist = (props: PropsType) => {

    const [value, setValue] = useState<string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const addTask = () => {
        props.addTask(value)
        setValue('')
    }

    const onKeyPressHandler = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={value} onChange={onChangeHandler} onKeyUp={onKeyPressHandler} />
                <Button title="+" onClick={addTask} />
            </div>
            <ul style={{ listStyle: 'none' }}>
                {props.tasks.map(task => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone} />
                            <span>{task.title}</span>
                            <Button onClick={() => props.removeTask(task.id)} title="x" />
                        </li>
                    );
                })}
            </ul>
            <div>
                <Button onClick={() => { props.changeTasksFilter("All") }} title="All" />
                <Button onClick={() => { props.changeTasksFilter("Active") }} title="Active" />
                <Button onClick={() => { props.changeTasksFilter("Completed") }} title="Completed" />
            </div>
        </div>
    );
}

