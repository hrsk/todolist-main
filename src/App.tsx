import { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { FilterValuesType, TaskType } from './types';

export const App = () => {

    let [filter, setFilter] = useState<FilterValuesType>('All');

    const [tasks, setTasks] = useState<TaskType[]>([
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'React', isDone: false },
        { id: 4, title: 'NodeJS', isDone: false },
    ])

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const changeTasksFilter = (filter: FilterValuesType) => {
        setFilter(filter)
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
                changeTasksFilter={changeTasksFilter} />
        </div>
    );
}
