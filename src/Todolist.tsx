import { AddItemForm } from "./AddItemForm";
import './App.css';
import { Button } from "./Button";
import { EditableForm } from "./EditableForm";
import { FilterValuesType, TaskType } from "./types";

export type PropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    todolistId: string
    addTask: (todolistId: string, value: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    changeTasksFilter: (todolistId: string, filter: FilterValuesType) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, value: string) => void
    changeTodolistTitle: (todolistId: string, value: string) => void
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: PropsType) => {

    const addTask = (value: string) => {
        props.addTask(props.todolistId, value)
    }

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

    const changeTaskTitleHandler = (taskId: string, value: string) => {
        props.changeTaskTitle(props.todolistId, taskId, value)
    }

    const changeTodolistTitleHandler = (value: string) => {
        props.changeTodolistTitle(props.todolistId, value)
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3>
                    <EditableForm value={props.title}
                        callback={(value) => changeTodolistTitleHandler(value)} />
                </h3>
                <Button title="x" onClick={removeTodolistHandler} />
            </div>
            <AddItemForm callback={addTask} />
            <ul style={{ listStyle: 'none' }}>
                {props.tasks.map(task => {
                    return (
                        <li key={task.id} className={task.isDone ? "isDone" : ''}>
                            <input type="checkbox"
                                checked={task.isDone}
                                onChange={(e) => changeTaskStatusHandler(task.id, e.currentTarget.checked)} />
                            <EditableForm value={task.title} callback={(value) => changeTaskTitleHandler(task.id, value)} />
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

