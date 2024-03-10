import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Todolist } from './Todolist';
import { FilterValuesType, TasksType, TodolistType } from './types';
import { Button } from './Button';
import { AddItemForm } from './AddItemForm';

export const App = () => {

    const todolistID1 = v1()
    const todolistID2 = v1()

    const [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'React', isDone: false },
            { id: v1(), title: 'NodeJS', isDone: false },],
        [todolistID2]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'React', isDone: false },
            { id: v1(), title: 'NodeJS', isDone: false },
        ],
    })

    const [todolists, setTodolists] = useState<TodolistType[]>([
        { id: todolistID1, title: 'What to learn', filter: 'All' },
        { id: todolistID2, title: 'Movies', filter: 'All' },
    ])

    // const [value, setValue] = useState<string>('')

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)
        })
    }

    const addTask = (todolistId: string, value: string) => {
        const newTask = { id: v1(), title: value, isDone: false }

        setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
    }

    const changeTasksFilter = (todolistId: string, filter: FilterValuesType) => {
        setTodolists(
            todolists.map(todolist => todolist.id === todolistId
                ? { ...todolist, filter }
                : todolist)
        )
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId
                ? { ...task, isDone }
                : task)
        })
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))

        delete tasks[todolistId]
        // setTasks({ ...tasks })
        // console.log(tasks)
    }

    const addTodolist = (value: string) => {
        const newTodolistId = v1()
        const newTodolist: TodolistType = { id: newTodolistId, title: value, filter: 'All' }

        setTodolists([newTodolist, ...todolists])
        setTasks({ ...tasks, [newTodolistId]: [] })
    }

    const changeTaskTitle = (todolistId: string, taskId: string, value: string) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId
                ? { ...task, title: value }
                : task)
        })
    }

    const changeTodolistTitle = (todolistId: string, value: string) => {
        setTodolists(
            todolists.map(todolist => todolist.id === todolistId
                ? { ...todolist, title: value } : todolist)
        )
    }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setValue(e.currentTarget.value)
    // }

    // const addTodolistHandler = () => {
    //     if (value.trim() !== '') {
    //         addTodolist(value.trim())
    //         setValue('')
    //     }
    // }

    // const onKeyPressHandler = (e: KeyboardEvent) => {
    //     if (e.altKey && e.key === 'Enter') {
    //         addTodolistHandler()
    //     }
    // }

    return (
        <div className="App">
            <AddItemForm callback={addTodolist} />
            {/* <div style={{ display: 'flex', alignItems: 'start' }}>
                <input value={value} onChange={onChangeHandler} onKeyUp={onKeyPressHandler} />
                <Button title='+' onClick={addTodolistHandler} />
            </div> */}
            {todolists.map(todolist => {

                let filteredTasks = tasks[todolist.id];
                if (todolist.filter === 'Active') {
                    filteredTasks = tasks[todolist.id].filter(tasks => !tasks.isDone)
                }
                if (todolist.filter === 'Completed') {
                    filteredTasks = tasks[todolist.id].filter(tasks => tasks.isDone)
                }

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
    );
}
