import { memo, useCallback } from "react";
import { AddItemForm } from "./AddItemForm";
import './App.css';
import { Button } from "./Button";
import { EditableForm } from "./EditableForm";
import { Tasks } from "./Tasks";
import { FilterValuesType } from "./types";

export type PropsType = {
    title: string
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

    const changeFilterHandler = useCallback((filter: FilterValuesType) => {
        props.changeTasksFilter(props.todolistId, filter)
    }, [props.changeTasksFilter, props.todolistId])

    const changeTodolistTitleHandler = useCallback((value: string) => {
        props.changeTodolistTitle(props.todolistId, value)
    }, [props.changeTodolistTitle, props.todolistId])

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
            <Tasks todolistId={props.todolistId}
                filter={props.filter}
                changeTaskStatus={props.changeTaskStatus}
                changeTaskTitle={props.changeTaskTitle}
                removeTask={props.removeTask} />
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

