import { memo, useCallback } from "react";
import { AddItemForm } from "./AddItemForm";
import './App.css';
import { Button } from "./Button";
import { EditableForm } from "./EditableForm";
import { FilterValuesType, TaskType, TasksType } from "./types";
import { Task } from "./Task";

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

export const Todolist = memo((props: PropsType) => {

    console.log('Todolist is called!')

    const addTask = useCallback((value: string) => {
        props.addTask(props.todolistId, value)
    }, [props.addTask, props.todolistId])

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    // const changeTaskStatusHandler = useCallback((taskId: string, isDone: boolean) => {
    //     props.changeTaskStatus(props.todolistId, taskId, isDone)
    // }, [props.changeTaskStatus, props.todolistId])

    // const removeTaskHandler = useCallback((taskId: string) => {
    //     props.removeTask(props.todolistId, taskId)
    // }, [props.removeTask, props.todolistId])

    const changeFilterHandler = useCallback((filter: FilterValuesType) => {
        props.changeTasksFilter(props.todolistId, filter)
    }, [props.changeTasksFilter, props.todolistId])

    // const changeTaskTitleHandler = useCallback((taskId: string, value: string) => {
    //     props.changeTaskTitle(props.todolistId, taskId, value)
    // }, [props.changeTaskTitle, props.todolistId])

    const changeTodolistTitleHandler = useCallback((value: string) => {
        props.changeTodolistTitle(props.todolistId, value)
    }, [props.changeTodolistTitle, props.todolistId])


    let filteredTasks = props.tasks

    if (props.filter === 'Active') {
        filteredTasks = props.tasks.filter(tasks => !tasks.isDone)
    }
    if (props.filter === 'Completed') {
        filteredTasks = props.tasks.filter(tasks => tasks.isDone)
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
                {filteredTasks.map(task => {
                    return (<Task key={task.id}
                        removeTask={props.removeTask}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        task={task}
                        todolistId={props.todolistId} />
                        // <li key={task.id} className={task.isDone ? "isDone" : ''}>
                        //     <input type="checkbox"
                        //         checked={task.isDone}
                        //         onChange={(e) => changeTaskStatusHandler(task.id, e.currentTarget.checked)} />
                        //     <EditableForm value={task.title} callback={(value) => changeTaskTitleHandler(task.id, value)} />
                        //     <Button onClick={() => removeTaskHandler(task.id)} title="x" />
                        // </li>
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
})

