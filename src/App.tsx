import { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { FilterValuesType, TaskType } from './types';
import { v1 } from 'uuid';

export const App = () => {

    let [filter, setFilter] = useState<FilterValuesType>('All');

    const [tasks, setTasks] = useState<TaskType[]>([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'React', isDone: false },
        { id: v1(), title: 'NodeJS', isDone: false },
    ])

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const addTask = (value: string) => {
        const newTask = { id: v1(), title: value, isDone: false }

        setTasks([newTask, ...tasks])
    }

    const changeTasksFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(task => task.id === taskId ? { ...task, isDone } : task))
    }

    let filteredTasks = tasks;
    if (filter === 'Active') {
        filteredTasks = tasks.filter(tasks => !tasks.isDone)
    }
    if (filter === 'Completed') {
        filteredTasks = tasks.filter(tasks => tasks.isDone)
    }

    return (

        <div className="App">
            <Todolist title='What to learn'
                tasks={filteredTasks}
                removeTask={removeTask}
                addTask={addTask}
                changeTasksFilter={changeTasksFilter}
                changeTaskStatus={changeTaskStatus} />
        </div>
    );
}
