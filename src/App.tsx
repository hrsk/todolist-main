import { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { FilterValuesType, TaskType, TodolistType } from './types';
import { v1 } from 'uuid';

export const App = () => {

    // let [filter, setFilter] = useState<FilterValuesType>('All');

    // const [tasks, setTasks] = useState<TaskType[]>([
    //     { id: v1(), title: 'HTML&CSS', isDone: true },
    //     { id: v1(), title: 'JS', isDone: true },
    //     { id: v1(), title: 'React', isDone: false },
    //     { id: v1(), title: 'NodeJS', isDone: false },
    // ])
    const todolistID1 = v1()
    const todolistID2 = v1()

    const [tasks, setTasks] = useState({
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
        // { id: v1(), title: 'Favorite books', filter: 'All' },
    ])

    const removeTask = (todolistId: string, taskId: string) => {
        // setTasks(tasks.filter(task => task.id !== taskId))
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)
        })
    }

    const addTask = (todolistId: string, value: string) => {
        const newTask = { id: v1(), title: value, isDone: false }

        // setTasks([newTask, ...tasks])
        setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
    }

    const changeTasksFilter = (todolistId: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? { ...todolist, filter } : todolist))
        // setFilter(filter)
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        // setTasks(tasks.map(task => task.id === taskId ? { ...task, isDone } : task))
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, isDone } : task) })
    }

    // let filteredTasks = tasks;
    // if (filter === 'Active') {
    //     filteredTasks = tasks.filter(tasks => !tasks.isDone)
    // }
    // if (filter === 'Completed') {
    //     filteredTasks = tasks.filter(tasks => tasks.isDone)
    // }

    return (

        <div className="App">
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
                        changeTaskStatus={changeTaskStatus} />
                )
            })}
            {/* <Todolist title='What to learn'
                tasks={filteredTasks}
                filter={filter}
                removeTask={removeTask}
                addTask={addTask}
                changeTasksFilter={changeTasksFilter}
                changeTaskStatus={changeTaskStatus} /> */}
        </div>
    );
}
