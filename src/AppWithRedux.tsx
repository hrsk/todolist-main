import { useDispatch, useSelector } from 'react-redux';
import { AddItemForm } from './AddItemForm';
import './App.css';
import { Todolist } from './Todolist';
import { AppStateType } from './store/store';
import { FilterValuesType, TasksType, TodolistType } from './types';
import { addTaskActionCreator, changeTaskStatusActionCreator, changeTaskTitleActionCreator, removeTaskActionCreator } from './tasks-reducer';
import { addTodolistActionCreator, changeTodolistFilterActionCreator, changeTodolistTitleActionCreator, removeTodolistActionCreator } from './todolist-reducer';
import { useCallback } from 'react';


export const AppWithRedux = () => {

    console.log('AppWithRedux is called!')


    const tasks = useSelector<AppStateType, TasksType>(state => state.tasks)
    const todolists = useSelector<AppStateType, TodolistType[]>(state => state.todo)
    const dispatch = useDispatch()

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskActionCreator(todolistId, taskId))
    }, [])

    const addTask = useCallback((todolistId: string, value: string) => {
        dispatch(addTaskActionCreator(todolistId, value))
    }, [])

    const changeTasksFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterActionCreator(todolistId, filter))
    }, [])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusActionCreator(todolistId, taskId, isDone))
    }, [])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistActionCreator(todolistId))
    }, [])

    const addTodolist = useCallback((value: string) => {
        dispatch(addTodolistActionCreator(value))
    }, [])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, value: string) => {
        dispatch(changeTaskTitleActionCreator(todolistId, taskId, value))
    }, [])

    const changeTodolistTitle = useCallback((todolistId: string, value: string) => {
        dispatch(changeTodolistTitleActionCreator(todolistId, value))
    }, [])

    return (
        <div className="App">
            <AddItemForm callback={addTodolist} />
            {todolists.map(todolist => {

                let filteredTasks = tasks[todolist.id];
                // if (todolist.filter === 'Active') {
                //     filteredTasks = tasks[todolist.id].filter(tasks => !tasks.isDone)
                // }
                // if (todolist.filter === 'Completed') {
                //     filteredTasks = tasks[todolist.id].filter(tasks => tasks.isDone)
                // }

                return (
                    <Todolist key={todolist.id}
                        todolistId={todolist.id}
                        title={todolist.title}
                        tasks={filteredTasks}
                        filter={todolist.filter}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeTasksFilter={changeTasksFilter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle} />
                )
            })}
        </div>
    )
}
